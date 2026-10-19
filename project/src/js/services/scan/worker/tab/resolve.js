/** Resolves the best scannable tab for QR scanning. */
async function workerTabResolve() {
  try {
    let detectedUrl = "(no tab found)";

    /** Returns the tab if its URL is scannable, otherwise undefined. */
    const accept = async (tab, source) => {
      const url = tab?.url || tab?.pendingUrl || "";
      if (url) {
        detectedUrl = url;
      }

      console.debug("[scan-tab] scan tab candidate", {
        source,
        id: tab?.id ?? null,
        url: tab?.url ?? null,
        pendingUrl: tab?.pendingUrl ?? null,
        active: tab?.active ?? null,
        windowId: tab?.windowId ?? null,
      });

      if (tab?.id != null && tab.id >= 0 && url) {
        const lower = url.toLowerCase();

        if (lower.startsWith("file://")) {
          const fileAllowed = await new Promise((resolve) => {
            if (!chrome.extension?.isAllowedFileSchemeAccess) {
              resolve(false);
              return;
            }

            chrome.extension.isAllowedFileSchemeAccess(resolve);
          });

          if (fileAllowed) {
            return tab;
          }
        } else if (
          lower.startsWith("http://") ||
          lower.startsWith("https://")
        ) {
          return tab;
        }
      }

      return undefined;
    };

    try {
      const normalWindow = await chrome.windows.getLastFocused({
        windowTypes: ["normal"],
      });

      if (normalWindow?.id != null) {
        const [normalActive] = await chrome.tabs.query({
          active: true,
          windowId: normalWindow.id,
        });
        const tab = await accept(normalActive, "lastFocusedNormalWindow");

        if (tab) {
          return {
            tab,
            detectedUrl: tab.url || tab.pendingUrl || "",
          };
        }
      }
    } catch (error) {
      console.warn("[scan-tab] workerTabResolve getLastFocused failed", error);
    }

    const [lastFocusedTab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    let tab = await accept(lastFocusedTab, "lastFocusedWindow");

    if (tab) {
      return { tab, detectedUrl: tab.url || tab.pendingUrl || "" };
    }

    const normalActiveTabs = await chrome.tabs.query({
      active: true,
      windowType: "normal",
    });

    for (const candidate of normalActiveTabs) {
      tab = await accept(candidate, "normalWindowActive");

      if (tab) {
        return { tab, detectedUrl: tab.url || tab.pendingUrl || "" };
      }
    }

    const normalTabs = await chrome.tabs.query({ windowType: "normal" });
    const byRecency = [...normalTabs].sort(
      (a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0),
    );

    for (const candidate of byRecency) {
      const url = candidate?.url || candidate?.pendingUrl || "";

      if (candidate?.id != null && candidate.id >= 0 && url) {
        const lower = url.toLowerCase();
        let scannable = false;

        if (lower.startsWith("file://")) {
          scannable = await new Promise((resolve) => {
            if (!chrome.extension?.isAllowedFileSchemeAccess) {
              resolve(false);
              return;
            }

            chrome.extension.isAllowedFileSchemeAccess(resolve);
          });
        } else if (
          lower.startsWith("http://") ||
          lower.startsWith("https://")
        ) {
          scannable = true;
        }

        if (scannable) {
          console.debug("[scan-tab] scan tab candidate", {
            source: "mostRecentScannableNormal",
            id: candidate?.id ?? null,
            url: candidate?.url ?? null,
            pendingUrl: candidate?.pendingUrl ?? null,
            active: candidate?.active ?? null,
            windowId: candidate?.windowId ?? null,
          });
          return { tab: candidate, detectedUrl: url };
        }
      }
    }

    console.warn("[scan-tab] no scannable tab; last detected URL:", detectedUrl);

    const display = detectedUrl?.trim() || "(unknown)";

    return {
      error: `QR scanning cannot run on this page: ${display}. Open a normal website tab and try again.`,
      detectedUrl,
    };
  } catch (error) {
    console.warn("[scan-tab] workerTabResolve failed", error);
    throw error;
  }
}

export { workerTabResolve };

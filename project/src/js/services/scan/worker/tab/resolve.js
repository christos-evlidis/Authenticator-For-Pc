/** Resolves the best scannable tab for QR scanning. */
async function workerTabResolve() {
  try {
    let detectedUrl = "(no tab found)";

    /** Checks if a tab's URL or properties allow injection. */
    const isScannableUrl = async (url) => {
      if (!url) return false;
      const lower = url.toLowerCase();

      // Disallowed internal Chrome/browser pages & webstores
      if (
        lower.startsWith("chrome://") ||
        lower.startsWith("chrome-extension://") ||
        lower.startsWith("edge://") ||
        lower.startsWith("about:") ||
        lower.startsWith("devtools://") ||
        lower.startsWith("https://chrome.google.com/webstore") ||
        lower.startsWith("https://chromewebstore.google.com")
      ) {
        return false;
      }

      if (lower.startsWith("file://")) {
        return await new Promise((resolve) => {
          if (!chrome.extension?.isAllowedFileSchemeAccess) {
            resolve(false);
            return;
          }
          chrome.extension.isAllowedFileSchemeAccess(resolve);
        });
      }

      return lower.startsWith("http://") || lower.startsWith("https://");
    };

    /** Returns the tab if its URL is scannable, otherwise undefined. */
    const accept = async (candidate, source) => {
      if (!candidate || candidate.id == null || candidate.id < 0) {
        return undefined;
      }

      let tab = candidate;
      // If URL is missing on candidate, retrieve full tab details via chrome.tabs.get
      if (!tab.url) {
        try {
          const fresh = await chrome.tabs.get(tab.id);
          if (fresh) tab = fresh;
        } catch {
          // ignore error if tab disappeared
        }
      }

      const url = tab?.url || tab?.pendingUrl || "";
      if (url) {
        detectedUrl = url;
      }

      console.debug("[scan-tab] candidate evaluation", {
        source,
        id: tab?.id,
        url,
        active: tab?.active,
        windowId: tab?.windowId,
      });

      // If we have a URL, check if it's scannable
      if (url) {
        if (await isScannableUrl(url)) {
          return tab;
        }
        return undefined;
      }

      // If url is still empty (e.g. host permission / privacy mask), but tab belongs to a normal window
      // and is not an extension window, accept it so scripting.executeScript can target it
      return tab;
    };

    // 1. First, search for normal browser windows (excluding popups/devtools/extension frames)
    try {
      const normalWindows = await chrome.windows.getAll({
        windowTypes: ["normal"],
        populate: true,
      });

      // Sort normal windows: focused first, then by id descending
      const sortedWindows = [...normalWindows].sort((a, b) => {
        if (a.focused) return -1;
        if (b.focused) return 1;
        return (b.id || 0) - (a.id || 0);
      });

      for (const win of sortedWindows) {
        const activeTab = win.tabs?.find((t) => t.active);
        const tab = await accept(activeTab, "normalWindowActive");
        if (tab) {
          return {
            tab,
            detectedUrl: tab.url || tab.pendingUrl || detectedUrl || "",
          };
        }
      }
    } catch (error) {
      console.warn("[scan-tab] workerTabResolve normalWindows query failed", error);
    }

    // 2. Fallback: last focused window query
    try {
      const [lastFocusedTab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      const tab = await accept(lastFocusedTab, "lastFocusedWindow");
      if (tab) {
        return { tab, detectedUrl: tab.url || tab.pendingUrl || detectedUrl || "" };
      }
    } catch (error) {
      console.warn("[scan-tab] workerTabResolve lastFocusedTab query failed", error);
    }

    // 3. Fallback: query all active tabs across all windows
    try {
      const activeTabs = await chrome.tabs.query({ active: true });
      for (const candidate of activeTabs) {
        const tab = await accept(candidate, "activeTabsAnyWindow");
        if (tab) {
          return { tab, detectedUrl: tab.url || tab.pendingUrl || detectedUrl || "" };
        }
      }
    } catch (error) {
      console.warn("[scan-tab] workerTabResolve activeTabs query failed", error);
    }

    // 4. Fallback: check most recently accessed normal tabs
    try {
      const normalTabs = await chrome.tabs.query({ windowType: "normal" });
      const byRecency = [...normalTabs].sort(
        (a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0),
      );

      for (const candidate of byRecency) {
        const tab = await accept(candidate, "mostRecentScannableNormal");
        if (tab) {
          return { tab, detectedUrl: tab.url || tab.pendingUrl || detectedUrl || "" };
        }
      }
    } catch (error) {
      console.warn("[scan-tab] workerTabResolve byRecency query failed", error);
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

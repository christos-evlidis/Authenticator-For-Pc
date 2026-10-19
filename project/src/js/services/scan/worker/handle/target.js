import { workerTabResolve } from "../tab/resolve.js";

/** Returns metadata for the tab that should be used for scanning. */
async function workerHandleTarget() {
  try {
    const { tab, error, detectedUrl } = await workerTabResolve();

    return {
      success: Boolean(tab),
      error,
      detectedUrl,
      tab: tab
        ? {
            id: tab.id,
            url: tab.url || tab.pendingUrl || "",
            pendingUrl: tab.pendingUrl ?? null,
            active: tab.active ?? null,
            windowId: tab.windowId ?? null,
          }
        : null,
    };
  } catch (error) {
    console.warn("[scan-handle] workerHandleTarget failed", error);
    throw error;
  }
}

export { workerHandleTarget };

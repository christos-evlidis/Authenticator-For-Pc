import { CONTENT_INDEX_PATH } from "../../../../const/const.scan.js";

/** Injects the scan content script into a tab if not already loaded. */
async function workerTabInject(tabId) {
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId },
      func: async (contentIndexPath) => {
        if (window.pcAuthQrScanLoaded) {
          return true;
        }

        const { contentScriptInit } = await import(
          chrome.runtime.getURL(contentIndexPath)
        );

        contentScriptInit();
        window.pcAuthQrScanLoaded = true;

        return true;
      },
      args: [CONTENT_INDEX_PATH],
    });

    if (result?.result === true) {
      return { ok: true };
    }

    return {
      ok: false,
      error: new Error("Content script did not initialize"),
    };
  } catch (error) {
    console.warn("[scan-tab] workerTabInject failed", error);
    return { ok: false, error };
  }
}

export { workerTabInject };

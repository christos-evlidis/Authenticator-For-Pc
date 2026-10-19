import { UNSUPPORTED_PAGE_ERROR } from "../../../const/const.scan.js";

/** Sends a scan payload to the extension service worker. */
function messageWorker(payload, { orError = true } = {}) {
  return new Promise((resolve) => {
    if (!chrome?.runtime?.sendMessage) {
      resolve(
        orError
          ? { success: false, error: UNSUPPORTED_PAGE_ERROR }
          : undefined,
      );
      return;
    }

    chrome.runtime.sendMessage(payload, (response) => {
      if (chrome.runtime.lastError) {
        resolve(
          orError
            ? { success: false, error: UNSUPPORTED_PAGE_ERROR }
            : undefined,
        );
        return;
      }

      resolve(response);
    });
  });
}

export { messageWorker };

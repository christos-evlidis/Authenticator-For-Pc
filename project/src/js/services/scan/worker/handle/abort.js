import { workerStoragePendingClear } from "../storage/pending/clear.js";
import { workerTabResolve } from "../tab/resolve.js";

import { MESSAGES } from "../../../../const/const.scan.js";
import { messageContent } from "../../message/message-index.js";

/** Aborts an in-progress scan and clears pending storage. */
async function workerHandleAbort(options = {}) {
  try {
    const { removeTabOverlay = false, broadcast = false } = options;

    if (removeTabOverlay) {
      const { tab } = await workerTabResolve();

      if (tab) {
        await messageContent(tab.id, MESSAGES.CANCEL_OVERLAY);
      }
    }

    await workerStoragePendingClear();

    if (broadcast) {
      chrome.runtime.sendMessage({ action: MESSAGES.CANCELLED_EVENT });
    }

    return { success: true };
  } catch (error) {
    console.warn("[scan-handle] workerHandleAbort failed", error);
    throw error;
  }
}

export { workerHandleAbort };

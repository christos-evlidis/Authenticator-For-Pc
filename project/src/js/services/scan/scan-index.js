import { messageWorker } from "./message/message-index.js";

import { MESSAGES, UNSUPPORTED_PAGE_ERROR } from "../../const/const.scan.js";

/** Starts a QR scan on the active tab via the service worker. */
async function scanStart() {
  try {
    return await messageWorker({ action: MESSAGES.START });
  } catch (error) {
    console.warn("[scan] scanStart failed", error);
    throw error;
  }
}

/** Cancels an in-progress scan and clears pending state. */
async function scanCancel() {
  try {
    return await messageWorker({ action: MESSAGES.CANCEL });
  } catch (error) {
    console.warn("[scan] scanCancel failed", error);
    throw error;
  }
}

/** Reads the pending QR scan result from session storage. */
async function scanPendingGet() {
  try {
    return await messageWorker(
      { action: MESSAGES.GET_PENDING },
      { orError: false },
    );
  } catch (error) {
    console.warn("[scan] scanPendingGet failed", error);
    throw error;
  }
}

/** Clears the pending QR scan session entry. */
async function scanPendingClear() {
  try {
    return await messageWorker({ action: MESSAGES.CLEAR_PENDING });
  } catch (error) {
    console.warn("[scan] scanPendingClear failed", error);
    throw error;
  }
}

export { scanCancel };
export { scanPendingClear };
export { scanPendingGet };
export { scanStart };

export { contentOverlayCreate } from "./content/content-index.js";
export { contentOverlayRemove } from "./content/content-index.js";
export { contentOverlayStart } from "./content/content-index.js";
export { contentOverlayStateStore } from "./content/content-index.js";
export { contentScreenshotCapture } from "./content/content-index.js";
export { contentScreenshotCrop } from "./content/content-index.js";
export { contentScreenshotLoad } from "./content/content-index.js";
export { contentScriptInit } from "./content/content-index.js";
export { messageContent } from "./message/message-index.js";
export { messageWorker } from "./message/message-index.js";
export { workerCodexDecode } from "./worker/worker-index.js";
export { workerHandleAbort } from "./worker/worker-index.js";
export { workerHandleCapture } from "./worker/worker-index.js";
export { workerHandleSelection } from "./worker/worker-index.js";
export { workerHandleStart } from "./worker/worker-index.js";
export { workerHandleTarget } from "./worker/worker-index.js";
export { workerScriptInit } from "./worker/worker-index.js";
export { workerStoragePendingClear } from "./worker/worker-index.js";
export { workerStoragePendingGet } from "./worker/worker-index.js";
export { workerStoragePendingSet } from "./worker/worker-index.js";
export { workerStorageStoreFailure } from "./worker/worker-index.js";
export { workerStorageStoreSuccess } from "./worker/worker-index.js";
export { workerTabCapture } from "./worker/worker-index.js";
export { workerTabInject } from "./worker/worker-index.js";
export { workerTabResolve } from "./worker/worker-index.js";

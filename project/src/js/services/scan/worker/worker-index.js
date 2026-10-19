import { extensionWindowInit, extensionWindowOpen } from "../../shell/extension-window.js";import { workerHandleAbort } from "./handle/abort.js";
import { workerHandleCapture } from "./handle/capture.js";
import { workerHandleSelection } from "./handle/selection.js";
import { workerHandleStart } from "./handle/start.js";
import { workerHandleTarget } from "./handle/target.js";
import { workerStoragePendingClear } from "./storage/pending/clear.js";
import { workerStoragePendingGet } from "./storage/pending/get.js";

import { MESSAGES, UNSUPPORTED_PAGE_ERROR } from "../../../const/const.scan.js";

/** Registers service-worker listeners for scan messages. */
function workerScriptInit() {
  extensionWindowInit();
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {    const { action } = message;
    if (action === MESSAGES.CANCELLED_EVENT) {
      void workerHandleAbort({ removeTabOverlay: true, broadcast: false }).then(() => {
        if (message.reopenPopup) {
          void extensionWindowOpen();
        }      });
      return false;
    }
    const asyncAction = {
      [MESSAGES.START]: () => workerHandleStart(),
      [MESSAGES.GET_SCAN_TARGET]: () => workerHandleTarget(),
      [MESSAGES.CAPTURE_TAB]: () => workerHandleCapture(),
      [MESSAGES.SCAN_QR_CODE]: () => workerHandleSelection(message),
      [MESSAGES.GET_PENDING]: () => workerStoragePendingGet(),
      [MESSAGES.CLEAR_PENDING]: async () => {
        await workerStoragePendingClear();
        return { success: true };
      },
      [MESSAGES.CANCEL]: () => workerHandleAbort({ removeTabOverlay: true }),
    };
    const run = asyncAction[action];
    if (!run) {
      return false;
    }
    run()
      .then((result) => {
        sendResponse(
          result ?? { success: false, error: UNSUPPORTED_PAGE_ERROR },
        );
      })
      .catch((error) => {
        console.warn("[scan-worker] message handler failed", error);
        sendResponse({ success: false, error: UNSUPPORTED_PAGE_ERROR });
      });
    return true;
  });
}

workerScriptInit();

export { workerScriptInit };

export { workerCodexDecode } from "./codex/decode.js";
export { workerHandleAbort } from "./handle/abort.js";
export { workerHandleCapture } from "./handle/capture.js";
export { workerHandleSelection } from "./handle/selection.js";
export { workerHandleStart } from "./handle/start.js";
export { workerHandleTarget } from "./handle/target.js";
export { workerStoragePendingClear } from "./storage/pending/clear.js";
export { workerStoragePendingGet } from "./storage/pending/get.js";
export { workerStoragePendingSet } from "./storage/pending/set.js";
export { workerStorageStoreFailure } from "./storage/store/failure.js";
export { workerStorageStoreSuccess } from "./storage/store/success.js";
export { workerTabCapture } from "./tab/capture.js";
export { workerTabInject } from "./tab/inject.js";
export { workerTabResolve } from "./tab/resolve.js";

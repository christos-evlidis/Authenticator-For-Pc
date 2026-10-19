import { contentOverlayRemove } from "./overlay/remove.js";
import { contentOverlayStart } from "./overlay/start.js";

import { MESSAGES } from "../../../const/const.scan.js";

/** Registers content-script listeners for scan overlay messages. */
function contentScriptInit() {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === MESSAGES.PING) {
      sendResponse({ loaded: true });
      return false;
    }

    if (message.action === MESSAGES.CANCEL_OVERLAY) {
      contentOverlayRemove();
      sendResponse({ success: true });
      return false;
    }

    if (message.action === MESSAGES.START_OVERLAY) {
      contentOverlayStart();
      sendResponse({ success: true });
      return false;
    }

    return false;
  });
}

contentScriptInit();

export { contentOverlayCreate } from "./overlay/create.js";
export { contentOverlayRemove } from "./overlay/remove.js";
export { contentOverlayStart } from "./overlay/start.js";
export { contentOverlayStateStore } from "./overlay/state/store.js";
export { contentScreenshotCapture } from "./screenshot/capture.js";
export { contentScreenshotCrop } from "./screenshot/crop.js";
export { contentScreenshotLoad } from "./screenshot/load.js";
export { contentScriptInit };

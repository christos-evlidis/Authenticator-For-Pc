import { contentOverlayStateStore } from "./state/store.js";

import { MESSAGES, OVERLAY_HOST_CLASS } from "../../../../const/const.scan.js";

/** Removes the QR scan overlay and optionally notifies cancellation. */
function contentOverlayRemove({ notifyCancel = false } = {}) {
  contentOverlayStateStore.teardown?.();
  contentOverlayStateStore.teardown = null;
  document.querySelector(`.${OVERLAY_HOST_CLASS}`)?.remove();

  if (notifyCancel) {
    chrome.runtime.sendMessage({ action: MESSAGES.CANCELLED_EVENT, reopenPopup: true });
  }
}

export { contentOverlayRemove };

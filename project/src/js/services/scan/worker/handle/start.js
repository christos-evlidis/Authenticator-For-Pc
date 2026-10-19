import { workerTabInject } from "../tab/inject.js";
import { workerTabResolve } from "../tab/resolve.js";

import { MESSAGES, START_FAILED_ERROR } from "../../../../const/const.scan.js";
import { messageContent } from "../../message/message-index.js";

/** Injects the content script and opens the scan overlay on the target tab. */
async function workerHandleStart() {
  try {
    const { tab, error } = await workerTabResolve();

    if (!tab) {
      return { success: false, error };
    }

    const injected = await workerTabInject(tab.id);

    if (!injected.ok) {
      const message =
        injected.error instanceof Error
          ? injected.error.message
          : String(injected.error ?? "");
      const detail = message
        ? `${START_FAILED_ERROR} (${message})`
        : START_FAILED_ERROR;

      return { success: false, error: detail };
    }

    const messaged = await messageContent(tab.id, MESSAGES.START_OVERLAY);

    if (!messaged.ok) {
      const message =
        messaged.error instanceof Error
          ? messaged.error.message
          : String(messaged.error ?? "");
      const detail = message
        ? `${START_FAILED_ERROR} (${message})`
        : START_FAILED_ERROR;

      return { success: false, error: detail };
    }

    return { success: true };
  } catch (error) {
    console.warn("[scan-handle] workerHandleStart failed", error);
    throw error;
  }
}

export { workerHandleStart };

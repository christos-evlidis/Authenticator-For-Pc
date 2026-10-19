import { workerCodexDecode } from "../codex/decode.js";
import { workerStorageStoreFailure } from "../storage/store/failure.js";
import { workerStorageStoreSuccess } from "../storage/store/success.js";

/** Decodes a QR code from the selected image region and stores the result. */
async function workerHandleSelection(message) {
  try {
    if (message.error) {
      await workerStorageStoreFailure(message.error);
      return { success: true };
    }

    const result = workerCodexDecode(
      message.imageData,
      message.width,
      message.height,
    );

    if (result) {
      await workerStorageStoreSuccess(result.data);
    } else {
      await workerStorageStoreFailure("No QR code found in the selected area.");
    }

    return { success: true };
  } catch (error) {
    console.warn("[scan-handle] workerHandleSelection failed", error);
    throw error;
  }
}

export { workerHandleSelection };

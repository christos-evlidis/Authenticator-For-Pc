import { extensionWindowOpen } from "../../../../shell/extension-window.js";
import { workerStoragePendingSet } from "../pending/set.js";

/** Stores a scan failure message and opens the extension popup. */
async function workerStorageStoreFailure(message) {
  try {
    await workerStoragePendingSet({
      status: "error",
      message,
    });
    await extensionWindowOpen();
  } catch (error) {
    console.warn("[scan-storage] workerStorageStoreFailure failed", error);
    throw error;
  }
}

export { workerStorageStoreFailure };

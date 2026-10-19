import { extensionWindowOpen } from "../../../../shell/extension-window.js";
import { workerStoragePendingSet } from "../pending/set.js";

/** Stores a successful scan URI and opens the extension popup. */
async function workerStorageStoreSuccess(uri) {
  try {
    await workerStoragePendingSet({
      status: "ready",
      uri,
    });
    await extensionWindowOpen();
  } catch (error) {
    console.warn("[scan-storage] workerStorageStoreSuccess failed", error);
    throw error;
  }
}

export { workerStorageStoreSuccess };

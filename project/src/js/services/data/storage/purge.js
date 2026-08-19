import { dataStorageMergedClear } from "./merged/clear.js";
import { dataStoragePendingClear } from "./pending/clear.js";
import { dataStorageReadyClear } from "./ready/clear.js";
import { dataStorageRestoredClear } from "./restored/clear.js";

import { DATA_KEY_LEGACY } from "../../../const/const.data.js";

/** Clears all account storage keys including legacy entries. */
async function dataStoragePurge() {
  try {
    await dataStorageReadyClear();
    await dataStorageRestoredClear();
    await dataStoragePendingClear();
    await dataStorageMergedClear();
    await chrome.storage.local.remove(DATA_KEY_LEGACY);
  } catch (error) {
    console.warn("[data-storage] dataStoragePurge failed", error);
    throw error;
  }
}

export { dataStoragePurge };

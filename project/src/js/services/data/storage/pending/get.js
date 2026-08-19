import { DATA_KEY_PENDING } from "../../../../const/const.data.js";

/** Reads pending accounts from local storage. */
async function dataStoragePendingGet() {
  try {
    const stored = await chrome.storage.local.get([DATA_KEY_PENDING]);
    return stored[DATA_KEY_PENDING];
  } catch (error) {
    console.warn("[data-storage] dataStoragePendingGet failed", error);
    throw error;
  }
}

export { dataStoragePendingGet };

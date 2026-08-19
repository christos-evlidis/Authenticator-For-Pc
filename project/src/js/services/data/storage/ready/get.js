import { DATA_KEY_FINAL } from "../../../../const/const.data.js";

/** Reads ready accounts from local storage. */
async function dataStorageReadyGet() {
  try {
    const stored = await chrome.storage.local.get([DATA_KEY_FINAL]);
    return stored[DATA_KEY_FINAL];
  } catch (error) {
    console.warn("[data-storage] dataStorageReadyGet failed", error);
    throw error;
  }
}

export { dataStorageReadyGet };

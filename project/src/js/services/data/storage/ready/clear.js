import { DATA_KEY_FINAL } from "../../../../const/const.data.js";

/** Removes ready accounts from local storage. */
async function dataStorageReadyClear() {
  try {
    await chrome.storage.local.remove([DATA_KEY_FINAL]);
  } catch (error) {
    console.warn("[data-storage] dataStorageReadyClear failed", error);
    throw error;
  }
}

export { dataStorageReadyClear };

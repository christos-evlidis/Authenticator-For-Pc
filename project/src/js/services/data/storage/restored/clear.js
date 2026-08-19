import { DATA_RESTORED } from "../../../../const/const.data.js";

/** Removes the restored accounts key from storage. */
export async function dataStorageRestoredClear() {
  try {
    await chrome.storage.local.remove(DATA_RESTORED);
  } catch (error) {
    console.warn("[data-storage] dataStorageRestoredClear failed", error);
    throw error;
  }
}

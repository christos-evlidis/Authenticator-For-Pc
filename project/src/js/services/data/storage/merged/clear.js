import { DATA_MERGED } from "../../../../const/const.data.js";

/** Removes the merged accounts key from storage. */
export async function dataStorageMergedClear() {
  try {
    await chrome.storage.local.remove(DATA_MERGED);
  } catch (error) {
    console.warn("[data-storage] dataStorageMergedClear failed", error);
    throw error;
  }
}

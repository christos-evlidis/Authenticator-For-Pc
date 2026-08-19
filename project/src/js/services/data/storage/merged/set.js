import { DATA_MERGED } from "../../../../const/const.data.js";

/** Saves the merged accounts list to storage. */
export async function dataStorageMergedSet(accounts) {
  try {
    await chrome.storage.local.set({ [DATA_MERGED]: accounts });
  } catch (error) {
    console.warn("[data-storage] dataStorageMergedSet failed", error);
    throw error;
  }
}

import { DATA_MERGED } from "@/js/const/const.data.js";

/** Retrieves merged accounts from storage. */
async function vaultStorageMergedGet() {
  try {
    const result = await chrome.storage.local.get(DATA_MERGED);
    return result[DATA_MERGED] || [];
  } catch {
    return null;
  }
}

/** Saves the merged accounts list to storage. */
async function vaultStorageMergedSet(accounts) {
  try {
    await chrome.storage.local.set({ [DATA_MERGED]: accounts });
  } catch {
    return null;
  }
}

/** Removes the merged accounts key from storage. */
async function vaultStorageMergedClear() {
  try {
    await chrome.storage.local.remove(DATA_MERGED);
  } catch {
    return null;
  }
}

export { vaultStorageMergedClear, vaultStorageMergedGet, vaultStorageMergedSet };

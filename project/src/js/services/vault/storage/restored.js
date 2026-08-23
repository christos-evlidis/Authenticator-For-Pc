import { DATA_RESTORED } from "@/js/const/const.data.js";

/** Retrieves restored accounts from storage. */
async function vaultStorageRestoredGet() {
  try {
    const result = await chrome.storage.local.get(DATA_RESTORED);
    return result[DATA_RESTORED] || [];
  } catch {
    return null;
  }
}

/** Saves the restored accounts list to storage. */
async function vaultStorageRestoredSet(accounts) {
  try {
    await chrome.storage.local.set({ [DATA_RESTORED]: accounts });
  } catch {
    return null;
  }
}

/** Removes the restored accounts key from storage. */
async function vaultStorageRestoredClear() {
  try {
    await chrome.storage.local.remove(DATA_RESTORED);
  } catch {
    return null;
  }
}

export { vaultStorageRestoredClear, vaultStorageRestoredGet, vaultStorageRestoredSet };

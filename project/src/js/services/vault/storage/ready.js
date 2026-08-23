import { DATA_KEY_FINAL } from "@/js/const/const.data.js";

/** Reads ready accounts from local storage. */
async function vaultStorageReadyGet() {
  try {
    const stored = await chrome.storage.local.get([DATA_KEY_FINAL]);
    return stored[DATA_KEY_FINAL];
  } catch {
    return null;
  }
}

/** Persists ready accounts to local storage. */
async function vaultStorageReadySet(accounts) {
  try {
    await chrome.storage.local.set({ [DATA_KEY_FINAL]: accounts });
  } catch {
    return null;
  }
}

/** Removes ready accounts from local storage. */
async function vaultStorageReadyClear() {
  try {
    await chrome.storage.local.remove([DATA_KEY_FINAL]);
  } catch {
    return null;
  }
}

export { vaultStorageReadyClear, vaultStorageReadyGet, vaultStorageReadySet };

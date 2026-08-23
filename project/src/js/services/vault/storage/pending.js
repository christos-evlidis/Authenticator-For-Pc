import { DATA_KEY_PENDING } from "@/js/const/const.data.js";

/** Reads pending accounts from local storage. */
async function vaultStoragePendingGet() {
  try {
    const stored = await chrome.storage.local.get([DATA_KEY_PENDING]);
    return stored[DATA_KEY_PENDING];
  } catch {
    return null;
  }
}

/** Persists pending accounts to local storage. */
async function vaultStoragePendingSet(accounts) {
  try {
    await chrome.storage.local.set({ [DATA_KEY_PENDING]: accounts });
  } catch {
    return null;
  }
}

/** Removes pending accounts from local storage. */
async function vaultStoragePendingClear() {
  try {
    await chrome.storage.local.remove([DATA_KEY_PENDING]);
  } catch {
    return null;
  }
}

/** Appends an account to the pending storage list. */
async function vaultStoragePendingAppend(account) {
  try {
    const pending = await vaultStoragePendingGet();
    await vaultStoragePendingSet([
      ...(Array.isArray(pending) ? pending : []),
      account,
    ]);
  } catch {
    return null;
  }
}

export { vaultStoragePendingAppend, vaultStoragePendingClear, vaultStoragePendingGet, vaultStoragePendingSet };

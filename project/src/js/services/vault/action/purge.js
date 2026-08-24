import { vaultStorageMergedClear } from "@/js/services/vault/storage/merged.js";
import { vaultStoragePendingClear } from "@/js/services/vault/storage/pending.js";
import { vaultStorageReadyClear } from "@/js/services/vault/storage/ready.js";
import { vaultStorageRestoredClear } from "@/js/services/vault/storage/restored.js";
import { DATA_KEY_LEGACY } from "@/js/const/const.data.js";

/** Clears all account storage keys including legacy entries. */
async function vaultActionPurge() {
  try {
    await vaultStorageReadyClear();
    await vaultStorageRestoredClear();
    await vaultStoragePendingClear();
    await vaultStorageMergedClear();
    await chrome.storage.local.remove(DATA_KEY_LEGACY);
  } catch {
    return null;
  }
}

export { vaultActionPurge };

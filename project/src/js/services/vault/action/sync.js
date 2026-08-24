import { accountStorageGet } from "@/js/services/account/storage/get.js";
import { vaultStorageSyncMerge } from "@/js/services/vault/sync/merge.js";
import { vaultStorageSyncRestore } from "@/js/services/vault/sync/restore.js";
import { vaultRecordSanitizeList } from "@/js/services/vault/record/sanitize/list.js";
import { vaultStorageMergedClear } from "@/js/services/vault/storage/merged.js";
import { vaultStoragePendingClear, vaultStoragePendingGet } from "@/js/services/vault/storage/pending.js";
import { vaultStorageReadyGet, vaultStorageReadySet } from "@/js/services/vault/storage/ready.js";
import { vaultStorageRestoredClear } from "@/js/services/vault/storage/restored.js";
import { vaultStorageRestoredGet } from "@/js/services/vault/storage/restored.js";

/** Runs the full vault sync pipeline: restore, merge pending, write ready storage. */
async function vaultActionSync() {
  try {
    const authNumber = await accountStorageGet();
    if (!authNumber) {
      return [];
    }

    const result = await vaultStorageSyncRestore(authNumber);
    if (!result || result.accounts == null) {
      const existing = vaultRecordSanitizeList(await vaultStorageReadyGet());
      await vaultStorageRestoredClear();
      await vaultStoragePendingClear();
      await vaultStorageMergedClear();
      if (existing.length) {
        return existing;
      }
      await vaultStorageReadySet([]);
      return [];
    }

    const pending = vaultRecordSanitizeList(await vaultStoragePendingGet());
    if (pending.length) {
      return vaultStorageSyncMerge();
    }

    const restored = vaultRecordSanitizeList(await vaultStorageRestoredGet());
    await vaultStorageReadySet(restored);
    await vaultStorageRestoredClear();
    await vaultStoragePendingClear();
    await vaultStorageMergedClear();
    return restored;
  } catch {
    return null;
  }
}

export { vaultActionSync };

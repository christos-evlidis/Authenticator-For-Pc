import { accountStorageGet } from "@/js/services/account/storage/get.js";
import { vaultSyncRun } from "@/js/services/vault/action/sync.js";
import { vaultSyncBackup } from "@/js/services/vault/sync/backup.js";
import { vaultSyncRestore } from "@/js/services/vault/sync/restore.js";
import { vaultRecordSanitizeList } from "@/js/services/vault/record/sanitize/list.js";
import { vaultStorageMergedClear, vaultStorageMergedSet } from "@/js/services/vault/storage/merged.js";
import { vaultStoragePendingClear } from "@/js/services/vault/storage/pending.js";
import { vaultStorageReadyGet } from "@/js/services/vault/storage/ready.js";
import { vaultStorageRestoredClear, vaultStorageRestoredGet } from "@/js/services/vault/storage/restored.js";

/** Removes an account by ID and syncs the updated list. */
async function vaultActionDelete(accountId) {
  try {
    const authNumber = await accountStorageGet();
    if (!authNumber) {
      return null;
    }
    const deleteId = String(accountId);
    await vaultSyncRestore(authNumber);

    let accounts = vaultRecordSanitizeList(await vaultStorageReadyGet());
    if (!accounts.length) {
      accounts = vaultRecordSanitizeList(await vaultStorageRestoredGet());
    }

    const filtered = accounts.filter(
      (account) => String(account.id) !== deleteId,
    );

    await vaultStorageMergedSet(filtered);
    await vaultSyncBackup(authNumber);
    await vaultStorageRestoredClear();
    await vaultStorageMergedClear();
    await vaultStoragePendingClear();
    return vaultSyncRun();
  } catch {
    return null;
  }
}

export { vaultActionDelete };

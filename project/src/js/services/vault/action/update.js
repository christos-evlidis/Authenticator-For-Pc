import { accountStorageGet } from "@/js/services/account/storage/get.js";
import { vaultActionSync } from "@/js/services/vault/action/sync.js";
import { vaultStorageSyncBackup } from "@/js/services/vault/sync/backup.js";
import { vaultStorageSyncRestore } from "@/js/services/vault/sync/restore.js";
import { vaultRecordSanitizeList } from "@/js/services/vault/record/sanitize/list.js";
import { vaultStorageMergedClear, vaultStorageMergedSet } from "@/js/services/vault/storage/merged.js";
import { vaultStoragePendingClear } from "@/js/services/vault/storage/pending.js";
import { vaultStorageReadyGet } from "@/js/services/vault/storage/ready.js";
import { vaultStorageRestoredClear, vaultStorageRestoredGet } from "@/js/services/vault/storage/restored.js";

/** Applies patch fields to an account and syncs the updated list. */
async function vaultActionUpdate(accountId, patch) {
  try {
    const authNumber = await accountStorageGet();
    if (!authNumber) {
      return null;
    }
    const updateId = String(accountId);
    await vaultStorageSyncRestore(authNumber);

    let accounts = vaultRecordSanitizeList(await vaultStorageReadyGet());
    if (!accounts.length) {
      accounts = vaultRecordSanitizeList(await vaultStorageRestoredGet());
    }

    const account = accounts.find((entry) => String(entry.id) === updateId);
    if (account) {
      if (patch.name != null) {
        account.name = patch.name;
      }
      if (patch.email !== undefined) {
        account.email = patch.email;
      }
      if (patch.username !== undefined) {
        account.username = patch.username;
      }
      if (patch.counter != null) {
        account.counter = patch.counter;
      }
    }

    await vaultStorageMergedSet(accounts);
    await vaultStorageSyncBackup(authNumber);
    await vaultStorageRestoredClear();
    await vaultStorageMergedClear();
    await vaultStoragePendingClear();
    return vaultActionSync();
  } catch {
    return null;
  }
}

export { vaultActionUpdate };

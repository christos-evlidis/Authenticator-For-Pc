import { accountStorageGet } from "@/js/services/account/storage/get.js";
import { vaultSyncBackup } from "@/js/services/vault/sync/backup.js";
import { vaultSyncMerge } from "@/js/services/vault/sync/merge.js";
import { vaultSyncRestore } from "@/js/services/vault/sync/restore.js";
import { vaultParseQr } from "@/js/services/vault/parse/qr.js";
import { vaultRecordBuildAccount } from "@/js/services/vault/record/build/account.js";
import { vaultStorageMergedClear } from "@/js/services/vault/storage/merged.js";
import { vaultStoragePendingAppend, vaultStoragePendingClear } from "@/js/services/vault/storage/pending.js";
import { vaultStorageRestoredClear } from "@/js/services/vault/storage/restored.js";

/** Adds an account from a QR otpauth URI through merge and backup. */
async function vaultActionAddQr(otpauthUri) {
  try {
    const authNumber = await accountStorageGet();
    if (!authNumber) {
      return null;
    }
    const parsed = vaultParseQr(otpauthUri);
    if (!parsed) {
      return null;
    }
    const account = vaultRecordBuildAccount(parsed);
    if (!account) {
      return null;
    }
    await vaultStoragePendingAppend(account);
    await vaultSyncRestore(authNumber);
    await vaultSyncMerge();
    await vaultSyncBackup(authNumber);
    await vaultStorageRestoredClear();
    await vaultStoragePendingClear();
    await vaultStorageMergedClear();
    return account;
  } catch {
    return null;
  }
}

export { vaultActionAddQr };

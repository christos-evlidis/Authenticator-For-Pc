import { remoteBackup } from "@/js/services/remote/action/backup.js";
import { cryptoEncrypt } from "@/js/services/crypto/action/encrypt.js";
import { vaultRecordSanitizeList } from "@/js/services/vault/record/sanitize/list.js";
import { vaultStorageMergedGet } from "@/js/services/vault/storage/merged.js";
import { vaultStorageReadySet } from "@/js/services/vault/storage/ready.js";

/** Encrypts merged accounts and uploads them to remote backup. */
async function vaultSyncBackup(authNumber) {
  try {
    const merged = vaultRecordSanitizeList(await vaultStorageMergedGet());
    const encryptedPayload = cryptoEncrypt(merged, authNumber);
    await remoteBackup(authNumber, encryptedPayload);
    await vaultStorageReadySet(merged);
  } catch {
    return null;
  }
}

export { vaultSyncBackup };

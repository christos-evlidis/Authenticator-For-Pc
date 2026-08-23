import { remoteRestore } from "@/js/services/remote/action/restore.js";
import { cryptoDecrypt } from "@/js/services/crypto/action/decrypt.js";
import { cryptoTypeEncrypted } from "@/js/services/crypto/type/encrypted.js";
import { vaultRecordSanitizeList } from "@/js/services/vault/record/sanitize/list.js";
import { vaultStorageRestoredClear, vaultStorageRestoredSet } from "@/js/services/vault/storage/restored.js";

/** Fetches and decrypts remote backup into restored storage. */
async function vaultSyncRestore(authNumber) {
  try {
    const result = await remoteRestore(authNumber);
    if (!result || result.accounts == null) {
      await vaultStorageRestoredClear();
    } else if (
      typeof result.accounts === "string" &&
      cryptoTypeEncrypted(result.accounts)
    ) {
      const plain = cryptoDecrypt(result.accounts, authNumber);
      if (plain == null) {
        await vaultStorageRestoredClear();
        return null;
      }
      await vaultStorageRestoredSet(vaultRecordSanitizeList(plain));
    } else {
      await vaultStorageRestoredSet(
        vaultRecordSanitizeList(result.accounts),
      );
    }
    return result;
  } catch {
    return null;
  }
}

export { vaultSyncRestore };

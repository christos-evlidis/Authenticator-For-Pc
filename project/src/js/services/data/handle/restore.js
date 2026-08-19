import { dataApiRestore } from "../api/restore.js";
import { dataCryptoDecrypt } from "../crypto/decrypt.js";
import { dataCryptoTypeEncrypted } from "../crypto/type/encrypted.js";
import { dataRecordSanitizeList } from "../record/sanitize/list.js";
import { dataStorageRestoredClear } from "../storage/restored/clear.js";
import { dataStorageRestoredSet } from "../storage/restored/set.js";

/** Fetches and decrypts remote backup into restored storage. */
async function dataHandleRestore(authNumber) {
  let result;
  try {
    result = await dataApiRestore(authNumber);
  } catch (error) {
    console.warn("[data-handle] dataHandleRestore fetch failed", error);
    throw error;
  }
  try {
    if (result.accounts == null) {
      await dataStorageRestoredClear();
    } else if (
      typeof result.accounts === "string" &&
      dataCryptoTypeEncrypted(result.accounts)
    ) {
      try {
        const decrypted = dataRecordSanitizeList(
          dataCryptoDecrypt(result.accounts, authNumber),
        );
        await dataStorageRestoredSet(decrypted);
      } catch (error) {
        console.warn("[data-handle] dataHandleRestore decrypt failed", error);
        await dataStorageRestoredClear();
        throw error;
      }
    } else {
      await dataStorageRestoredSet(
        dataRecordSanitizeList(result.accounts),
      );
    }
  } catch (error) {
    console.warn("[data-handle] dataHandleRestore cache update failed", error);
    throw error;
  }
  return result;
}

export { dataHandleRestore };

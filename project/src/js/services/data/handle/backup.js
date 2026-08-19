import { dataApiBackup } from "../api/backup.js";
import { dataCryptoEncrypt } from "../crypto/encrypt.js";
import { dataRecordSanitizeList } from "../record/sanitize/list.js";
import { dataStorageMergedGet } from "../storage/merged/get.js";
import { dataStorageReadySet } from "../storage/ready/set.js";

/** Encrypts merged accounts and uploads them to remote backup. */
async function dataHandleBackup(authNumber) {
  try {
    const merged = dataRecordSanitizeList(
      await dataStorageMergedGet(),
    );
    const encryptedPayload = dataCryptoEncrypt(merged, authNumber);
    await dataApiBackup(authNumber, encryptedPayload);
    await dataStorageReadySet(merged);
  } catch (error) {
    console.warn("[data-handle] dataHandleBackup failed", error);
    throw error;
  }
}

export { dataHandleBackup };

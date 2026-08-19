import { dataHandleBackup } from "../handle/backup.js";
import { dataHandleRestore } from "../handle/restore.js";
import { dataHandleSync } from "../handle/sync.js";
import { dataRecordSanitizeList } from "../record/sanitize/list.js";
import { dataStorageMergedClear } from "../storage/merged/clear.js";
import { dataStorageMergedSet } from "../storage/merged/set.js";
import { dataStoragePendingClear } from "../storage/pending/clear.js";
import { dataStorageReadyGet } from "../storage/ready/get.js";
import { dataStorageRestoredClear } from "../storage/restored/clear.js";
import { dataStorageRestoredGet } from "../storage/restored/get.js";

/** Removes an account by ID and syncs the updated list. */
async function dataActionDelete(authNumber, accountId) {
  try {
    const deleteId = String(accountId);
    await dataHandleRestore(authNumber);

    let accounts = dataRecordSanitizeList(await dataStorageReadyGet());
    if (!accounts.length) {
      accounts = dataRecordSanitizeList(await dataStorageRestoredGet());
    }

    const filtered = accounts.filter(
      (account) => String(account.id) !== deleteId,
    );

    await dataStorageMergedSet(filtered);
    await dataHandleBackup(authNumber);
    await dataStorageRestoredClear();
    await dataStorageMergedClear();
    await dataStoragePendingClear();
    return dataHandleSync(authNumber);
  } catch (error) {
    console.warn("[data-action] dataActionDelete failed", error);
    throw error;
  }
}

export { dataActionDelete };

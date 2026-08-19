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

/** Applies patch fields to an account and syncs the updated list. */
async function dataActionUpdate(authNumber, accountId, patch) {
  try {
    const updateId = String(accountId);
    await dataHandleRestore(authNumber);

    let accounts = dataRecordSanitizeList(await dataStorageReadyGet());
    if (!accounts.length) {
      accounts = dataRecordSanitizeList(await dataStorageRestoredGet());
    }

    const account = accounts.find((entry) => String(entry.id) === updateId);
    if (!account) {
      console.warn(
        `[data-action] dataActionUpdate: account ${updateId} not found in dataBackup`,
      );
    } else {
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

    await dataStorageMergedSet(accounts);
    await dataHandleBackup(authNumber);
    await dataStorageRestoredClear();
    await dataStorageMergedClear();
    await dataStoragePendingClear();
    return dataHandleSync(authNumber);
  } catch (error) {
    console.warn("[data-action] dataActionUpdate failed", error);
    throw error;
  }
}

export { dataActionUpdate };

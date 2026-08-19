import { dataHandleBackup } from "../../handle/backup.js";
import { dataHandleMerge } from "../../handle/merge.js";
import { dataHandleRestore } from "../../handle/restore.js";
import { dataParseManual } from "../../parse/manual.js";
import { dataRecordBuildAccount } from "../../record/build/account.js";
import { dataStorageMergedClear } from "../../storage/merged/clear.js";
import { dataStoragePendingAppend } from "../../storage/pending/append.js";
import { dataStoragePendingClear } from "../../storage/pending/clear.js";
import { dataStorageRestoredClear } from "../../storage/restored/clear.js";

/** Adds a manually entered account through parse, merge, and backup. */
async function dataActionAddManual(authNumber, formData) {
  try {
    const parsed = dataParseManual(formData);
    const account = dataRecordBuildAccount(parsed);
    await dataStoragePendingAppend(account);
    await dataHandleRestore(authNumber);
    await dataHandleMerge(authNumber);
    await dataHandleBackup(authNumber);
    await dataStorageRestoredClear();
    await dataStoragePendingClear();
    await dataStorageMergedClear();
    return account;
  } catch (error) {
    console.warn("[data-action] dataActionAddManual failed", error);
    throw error;
  }
}

export { dataActionAddManual };

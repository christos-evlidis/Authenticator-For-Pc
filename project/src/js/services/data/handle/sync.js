import { dataHandleMerge } from "./merge.js";
import { dataHandleRestore } from "./restore.js";
import { dataRecordSanitizeList } from "../record/sanitize/list.js";
import { dataStorageMergedClear } from "../storage/merged/clear.js";
import { dataStoragePendingClear } from "../storage/pending/clear.js";
import { dataStoragePendingGet } from "../storage/pending/get.js";
import { dataStorageReadyGet } from "../storage/ready/get.js";
import { dataStorageReadySet } from "../storage/ready/set.js";
import { dataStorageRestoredClear } from "../storage/restored/clear.js";
import { dataStorageRestoredGet } from "../storage/restored/get.js";

/** Syncs local accounts with remote restore and pending merge state. */
async function dataHandleSync(authNumber) {
  try {
    const result = await dataHandleRestore(authNumber);
    if (result.accounts == null) {
      const existing = dataRecordSanitizeList(
        await dataStorageReadyGet(),
      );
      await dataStorageRestoredClear();
      await dataStoragePendingClear();
      await dataStorageMergedClear();
      if (existing.length) {
        console.debug(
          `[data-handle] dataHandleSync: empty restore; keeping ${existing.length} local account(s)`,
        );
        return existing;
      }
      await dataStorageReadySet([]);
      return [];
    }

    const pending = dataRecordSanitizeList(
      await dataStoragePendingGet(),
    );
    if (pending.length) {
      return dataHandleMerge(authNumber);
    }

    const restored = dataRecordSanitizeList(
      await dataStorageRestoredGet(),
    );
    await dataStorageReadySet(restored);

    try {
      await dataStorageRestoredClear();
      await dataStoragePendingClear();
      await dataStorageMergedClear();
    } catch (error) {
      console.warn(
        "[data-handle] dataHandleSync clear temp keys failed",
        error,
      );
      throw error;
    }
    return restored;
  } catch (error) {
    console.warn("[data-handle] dataHandleSync failed", error);
    throw error;
  }
}

export { dataHandleSync };

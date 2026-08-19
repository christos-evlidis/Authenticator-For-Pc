import { dataRecordSanitizeList } from "../record/sanitize/list.js";
import { dataStorageMergedSet } from "../storage/merged/set.js";
import { dataStoragePendingGet } from "../storage/pending/get.js";
import { dataStorageReadyGet } from "../storage/ready/get.js";
import { dataStorageRestoredGet } from "../storage/restored/get.js";

/** Merges restored, ready, and pending account lists by ID. */
async function dataHandleMerge(authNumber, options = {}) {
  try {
    const restored = dataRecordSanitizeList(
      options.baseList ?? (await dataStorageRestoredGet()),
    );
    const ready = dataRecordSanitizeList(await dataStorageReadyGet());
    const pending = dataRecordSanitizeList(await dataStoragePendingGet());

    let merged = restored;

    for (const incoming of [ready, pending]) {
      const indexById = new Map();
      merged.forEach((account, index) => {
        indexById.set(String(account.id), index);
      });
      const toPrepend = [];
      for (const account of incoming) {
        const id = String(account.id);
        if (indexById.has(id)) {
          merged[indexById.get(id)] = account;
        } else {
          toPrepend.push(account);
        }
      }
      merged = [...toPrepend.reverse(), ...merged];
    }

    try {
      await dataStorageMergedSet(merged);
    } catch (error) {
      console.warn("[data-handle] dataHandleMerge persist failed", error);
      throw error;
    }
    return merged;
  } catch (error) {
    console.warn("[data-handle] dataHandleMerge failed", error);
    throw error;
  }
}

export { dataHandleMerge };

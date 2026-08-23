import { vaultRecordSanitizeList } from "@/js/services/vault/record/sanitize/list.js";
import { vaultStorageMergedSet } from "@/js/services/vault/storage/merged.js";
import { vaultStoragePendingGet } from "@/js/services/vault/storage/pending.js";
import { vaultStorageReadyGet } from "@/js/services/vault/storage/ready.js";
import { vaultStorageRestoredGet } from "@/js/services/vault/storage/restored.js";

/** Merges restored, ready, and pending account lists by ID. */
async function vaultSyncMerge(options = {}) {
  try {
    const restored = vaultRecordSanitizeList(
      options.baseList ?? (await vaultStorageRestoredGet()),
    );
    const ready = vaultRecordSanitizeList(await vaultStorageReadyGet());
    const pending = vaultRecordSanitizeList(await vaultStoragePendingGet());

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

    await vaultStorageMergedSet(merged);
    return merged;
  } catch {
    return null;
  }
}

export { vaultSyncMerge };

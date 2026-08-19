import { dataStoragePendingGet } from "./get.js";
import { dataStoragePendingSet } from "./set.js";

/** Appends an account to the pending storage list. */
async function dataStoragePendingAppend(account) {
  try {
    const pending = await dataStoragePendingGet();
    await dataStoragePendingSet([
      ...(Array.isArray(pending) ? pending : []),
      account,
    ]);
  } catch (error) {
    console.warn("[data-storage] dataStoragePendingAppend failed", error);
    throw error;
  }
}

export { dataStoragePendingAppend };

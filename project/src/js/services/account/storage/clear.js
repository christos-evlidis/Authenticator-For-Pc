import { AUTH_NUMBER_KEY } from "@/js/const/const.auth.js";

/** Removes the stored auth number from local storage. */
async function accountStorageClear() {
  try {
    await chrome.storage.local.remove([AUTH_NUMBER_KEY]);
  } catch {
    return null;
  }
}

export { accountStorageClear };

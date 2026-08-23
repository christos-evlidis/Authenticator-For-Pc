import { AUTH_NUMBER_KEY } from "@/js/const/const.auth.js";

/** Reads the stored auth number from local storage. */
async function accountStorageGet() {
  try {
    const stored = await chrome.storage.local.get([AUTH_NUMBER_KEY]);
    return stored[AUTH_NUMBER_KEY] ?? null;
  } catch {
    return null;
  }
}

export { accountStorageGet };

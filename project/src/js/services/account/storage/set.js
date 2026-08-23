import { AUTH_NUMBER_KEY } from "@/js/const/const.auth.js";

/** Persists the auth number to local storage. */
async function accountStorageSet(authNumber) {
  try {
    await chrome.storage.local.set({
      [AUTH_NUMBER_KEY]: authNumber,
    });
  } catch {
    return null;
  }
}

export { accountStorageSet };

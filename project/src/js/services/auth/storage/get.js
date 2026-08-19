import { AUTH_NUMBER_KEY } from "../../../const/const.auth.js";

/** Reads the stored auth number from local storage. */
async function authStorageGet() {
  try {
    const stored = await chrome.storage.local.get([AUTH_NUMBER_KEY]);
    return stored[AUTH_NUMBER_KEY] ?? null;
  } catch (error) {
    console.warn("[auth-storage] authStorageGet failed", error);
    throw error;
  }
}

export { authStorageGet };

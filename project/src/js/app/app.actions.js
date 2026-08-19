import { authApiCreate, authApiVerify, authSanitizeNumber, authStorageClear, authStorageSet } from "../services/auth/auth-index.js";
import { dataStoragePurge } from "../services/data/data-index.js";
import { themeActionApply } from "../services/theme/theme-index.js";
import { themeStateGet } from "../services/theme/state/get.js";

import { appStateGet } from "./app.state.js";


/** Verifies the account number and persists it when sign-in succeeds. */
async function appSignIn(input) {
  try {
    const authKey = authSanitizeNumber(input); // Normalize the entered account number input.
    const result = await authApiVerify(authKey); // Verify the account number with the API.
    if (result) { // Continue only when verification succeeds.
      await authStorageSet(authKey); // Persist the verified account key locally.
      return true; // Report sign-in success to the caller.
    }
  } catch {}
  return false; // Report sign-in failure when verification or storage fails.
}

/** Creates a new account and persists it when sign-up succeeds. */
async function appSignUp() {
  try {
    const result = await authApiCreate(); // Request a new account number from the API.
    if (result?.success === true) { // Continue only when account creation succeeds.
      const authKey = result.account_number; // Read the generated account number from the response.
      await authStorageSet(authKey); // Persist the new account key locally.
      return true; // Report sign-up success to the caller.
    }
  } catch {}
  return false; // Report sign-up failure when creation or storage fails.
}

/** Clears stored auth and account data when sign-out succeeds. */
async function appSignOut() {
  try {
    await authStorageClear(); // Remove the stored account key from auth storage.
    await dataStoragePurge(); // Remove all locally stored authenticator data.
    return true; // Report sign-out success to the caller.
  } catch {}
  return false; // Report sign-out failure when clearing storage fails.
}

/** Applies the specified application theme. */
function appThemeApply(theme) {
  try {
    themeActionApply(theme); // Delegate theme application to the theme service.
  } catch {}
}

/** Returns the active account authentication key from app state. */
function appAuthGet() {
  try {
    return appStateGet().authKey; // Read the current auth key from in-memory app state.
  } catch {}
  return null; // Return null when app state is unavailable.
}

/** Returns the active application theme key. */
function appThemeGet() {
  try {
    return themeStateGet(); // Read the current theme key from the theme service.
  } catch {}
  return null; // Return null when theme state is unavailable.
}


export { appAuthGet, appSignIn, appSignOut, appSignUp, appThemeApply, appThemeGet };

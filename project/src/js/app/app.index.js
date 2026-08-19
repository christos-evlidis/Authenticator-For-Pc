import "@fortawesome/fontawesome-free/css/all.min.css";
import { authApiVerify, authStorageGet } from "../services/auth/auth-index.js";
import { dataHandleSync } from "../services/data/data-index.js";
import { themeInit } from "../services/theme/theme-index.js";

import { appSessionRefresh } from "./app.session.js";
import { appStateGet } from "./app.state.js";

import { initSectionModules } from "../sections/sections-index.js";

/** Reveals the app elements by removing is-hidden. */
function revealApp() {
  document.querySelector(".app-header")?.classList.remove("is-hidden");
  document.querySelector(".app-body")?.classList.remove("is-hidden");
}

/** Initializes and starts the application. */
async function appInit() {
  try {
    themeInit(); // Apply the saved theme before rendering UI.
    initSectionModules(); // Bind section events and render initial section state.
    const authKey = await authStorageGet(); // Load any stored account key from auth storage.
    if (authKey) { // Continue with authenticated startup when a stored key exists.
      const request = await authApiVerify(authKey); // Verify the stored account key with the API.
      if (request) { // Sync data and refresh session only for valid stored accounts.
        await dataHandleSync(authKey); // Sync authenticator data for the verified account.
        await appSessionRefresh(); // Refresh app state, shell, and signed-in UI.
      } else { // Abort startup when the stored account key is invalid.
        throw new Error("Account Verification Failed"); // Stop init so the shell does not load with bad auth.
      }
    } else { // Continue with signed-out startup when no stored key exists.
      await appSessionRefresh(); // Refresh app state, shell, and signed-out UI.
    }
    revealApp(); // Play the normal startup intro animation.
  } catch {}
  return; // Stop startup quietly when initialization fails.
}


void appInit();

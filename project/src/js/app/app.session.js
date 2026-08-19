import { authStorageGet } from "../services/auth/auth-index.js";
import { dataStorageReadyGet } from "../services/data/data-index.js";

import { appShellRefresh } from "./app.shell.js";
import { appStateSet } from "./app.state.js";

import { codesInit } from "../sections/shell/codes/codes-index.js";
import { userMenuRenderSignedIn, userMenuRenderSignedOut } from "../sections/overlay/user-menu/user-menu.render.js";


/** Refreshes session state from storage and updates the shell and UI. */
async function appSessionRefresh() {
  const authKey = await authStorageGet(); // Load the stored account key from auth storage.
  const authState = Boolean(authKey); // Derive signed-in state from the stored account key.
  const authCodes = (await dataStorageReadyGet()) || []; // Load ready authenticator codes for the account.
  appStateSet({
    stateAuth: authState, // Persist the signed-in state in app memory.
    authKey, // Persist the active account key in app memory.
  });
  appShellRefresh({
    stateAuth: authState, // Pass signed-in state to the shell refresh flow.
    stateCodes: authCodes.length > 0, // Pass whether any codes are available to the shell.
  });
  if (authState) { // Render signed-in UI when the user is authenticated.
    userMenuRenderSignedIn(authKey); // Show the signed-in user-menu view and account field.
  } else { // Render signed-out UI when the user is not authenticated.
    userMenuRenderSignedOut(); // Show the sign-in and sign-up user-menu views.
  }
  if (authState) { // Initialize codes only for authenticated users.
    await codesInit(authCodes); // Build and render the codes list from stored data.
  }
}


export { appSessionRefresh };

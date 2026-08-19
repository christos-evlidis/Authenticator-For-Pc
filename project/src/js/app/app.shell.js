import { bodyApplySignedIn, bodyApplySignedOut } from "../sections/shell/body/body-index.js";
import { codesApply } from "../sections/shell/codes/codes-index.js";
import { headerApplySignedIn, headerApplySignedOut } from "../sections/shell/header/header-index.js";
import { searchApply } from "../sections/shell/search/search-index.js";


/** Refreshes shell header, body, search, and codes for the current auth state. */
function appShellRefresh(options = {}) {
  const stateAuth = Boolean(options.stateAuth); // Normalize the signed-in flag from caller options.
  if (stateAuth) { // Use the signed-in shell layout when the user is authenticated.
    headerApplySignedIn(); // Show signed-in header controls and state.
    bodyApplySignedIn({ stateCodes: options.stateCodes }); // Show signed-in body content and code state.
    searchApply(true); // Enable search for signed-in users.
    codesApply(true); // Show the codes section for signed-in users.
  } else { // Use the signed-out shell layout when the user is not authenticated.
    headerApplySignedOut(); // Show signed-out header controls and state.
    bodyApplySignedOut(); // Show signed-out body content.
    searchApply(false); // Disable search for signed-out users.
    codesApply(false); // Hide the codes section for signed-out users.
  }
}


export { appShellRefresh };

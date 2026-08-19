import { appAuthGet } from "../../../app/app.actions.js";

import { userMenuEventsBind } from "./user-menu.events.js";
import { userMenuRenderSignedIn, userMenuRenderSignedOut, userMenuRenderSwitchAuth } from "./user-menu.render.js";

/** Initializes the user-menu module, binds events, and renders the initial view. */
function _userMenuInit(authState, authKey) {
  userMenuEventsBind(); // Attach all user-menu click and submit handlers once.
  userMenuRenderSwitchAuth(appAuthGet()); // Sync the auth tab UI to the current sign-in or sign-up view.
  if (authState) { // Use the signed-in render path when the app is authenticated.
    userMenuRenderSignedIn(authKey); // Show the signed-in account view and account number field.
  } else { // Use the signed-out render path when the app is not authenticated.
    userMenuRenderSignedOut(authKey); // Show the sign-in form, sign-up button, and auth bar.
  }
}

export { _userMenuInit as userMenuInit };

// Functions exported from this section:
// - userMenuInit

// Functions used by other parts of the codebase:
// - userMenuInit (used in project/src/js/sections/sections-index.js)

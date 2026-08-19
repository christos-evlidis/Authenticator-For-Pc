import { userMenuAccountNumberCopy, userMenuAccountNumberDownload } from "./action/user-menu.account.js";
import { userMenuAuthSignIn, userMenuAuthSignOut, userMenuAuthSignUp } from "./action/user-menu.auth.js";
import { userMenuPanelClose, userMenuPanelToggle } from "./action/user-menu.panel.js";
import { userMenuSwitchAuth } from "./action/user-menu.view.js";
import { userMenuDomGet, userMenuDomSet } from "./user-menu.dom.js";

import { USER_MENU_ACCOUNT_FIELD_SIGNED_OUT_SELECTOR } from "../../../const/const.user-menu.js";

let _userMenuEventsBound = false;

/** Binds all user-menu event listeners once. */
function _userMenuEventsBind() {
  if (_userMenuEventsBound) { // Stop when listeners are already attached.
    return; // Exit without binding duplicate handlers.
  }
  _userMenuEventsBound = true; // Mark event binding as complete for this session.
  const dom = userMenuDomGet(); // Read the current user-menu DOM references.
  dom.openBtns.forEach((button) => { // Attach open handlers to every header user-menu button.
    button.addEventListener("click", userMenuPanelToggle); // Toggle the panel open or closed on header button click.
  });
  dom.closeBtn?.addEventListener("click", userMenuPanelClose); // Close the panel when the close button is clicked.
  dom.backdrop?.addEventListener("click", userMenuPanelClose); // Close the panel when the backdrop is clicked.
  dom.authBtns.forEach((button) => { // Attach handlers to the sign-in and sign-up tab buttons.
    button.addEventListener("click", (event) => { // Switch auth views when a tab button is clicked.
      event.preventDefault(); // Prevent any default button behavior.
      userMenuSwitchAuth(event.currentTarget.dataset.view); // Switch to the clicked sign-in or sign-up view.
    });
  });
  dom.signInForm?.addEventListener("submit", (event) => { // Handle sign-in form submission.
    event.preventDefault(); // Stop the browser from performing a normal form submit.
    void userMenuAuthSignIn(event.currentTarget.querySelector(USER_MENU_ACCOUNT_FIELD_SIGNED_OUT_SELECTOR)?.value); // Start sign-in with the entered account number.
  });
  dom.signUpBtn?.addEventListener("click", () => { // Handle sign-up button clicks.
    void userMenuAuthSignUp(); // Start the sign-up auth flow.
  });
  dom.logoutBtn?.addEventListener("click", () => { // Handle sign-out button clicks.
    void userMenuAuthSignOut(); // Start the sign-out auth flow.
  });
  dom.accountCopyBtn?.addEventListener("click", () => { // Handle copy account button clicks.
    void userMenuAccountNumberCopy(); // Copy the signed-in account number to the clipboard.
  });
  dom.accountDownloadBtn?.addEventListener("click", () => { // Handle download account button clicks.
    void userMenuAccountNumberDownload(); // Download the signed-in account number as a text file.
  });
  userMenuDomSet({ showViewSignUp: false }); // Hide the sign-up view during initial event binding.
}

export { _userMenuEventsBind as userMenuEventsBind };

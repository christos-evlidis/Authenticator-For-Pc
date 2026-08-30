import { appStateGet, appStateSet } from "@/js/app/app.state.js";
import { USER_MENU_ACCOUNT_COPY_BTN_SELECTOR, USER_MENU_ACCOUNT_DOWNLOAD_BTN_SELECTOR, USER_MENU_ACCOUNT_FIELD_SIGNED_IN_SELECTOR, USER_MENU_ACCOUNT_FIELD_SIGNED_OUT_SELECTOR, USER_MENU_ACCOUNT_ACTION_FADE_MS, USER_MENU_ACCOUNT_ACTION_SUCCESS_CLASS, USER_MENU_ACCOUNT_ACTION_SUCCESS_HOLD_MS, USER_MENU_AUTH_BAR_SELECTOR, USER_MENU_AUTH_BTN_SELECTOR, USER_MENU_AUTH_SIGN_IN_CLASS, USER_MENU_AUTH_SIGN_UP_CLASS, USER_MENU_AUTH_TRACK_SELECTOR, USER_MENU_AUTH_VIEW_SIGN_IN, USER_MENU_AUTH_VIEW_SIGN_UP, USER_MENU_BACKDROP_SELECTOR, USER_MENU_CLOSE_BTN_SELECTOR, USER_MENU_HIDDEN_CLASS, USER_MENU_LOGOUT_BTN_SELECTOR, USER_MENU_OPEN_BTN_SELECTOR, USER_MENU_PANEL_OPEN_CLASS, USER_MENU_ROOT_SELECTOR, USER_MENU_SIGN_IN_FORM_SELECTOR, USER_MENU_SIGN_UP_BTN_SELECTOR, USER_MENU_SIGNED_IN_VIEW_SELECTOR, USER_MENU_SIGNED_OUT_VIEW_SELECTOR, USER_MENU_SIGN_IN_VIEW_SELECTOR, USER_MENU_SIGN_UP_VIEW_SELECTOR, USER_MENU_VIEW_ACTIVE_AUTH } from "@/js/const/const.user-menu.js";
import { bodyInit } from "@/js/sections/body/body.index.js";
import { searchBarInit } from "@/js/sections/search-bar/search-bar.index.js";
import { userMenuAuthAnimation, userMenuCloseAnimation, userMenuOpenAnimation } from "@/js/sections/user-menu/user-menu.animations.js";
import { accountActionSignIn, accountActionSignOut, accountActionSignUp, accountStorageGet } from "@/js/services/account/account-index.js";

let userMenuAuthView = USER_MENU_AUTH_VIEW_SIGN_IN;

/** Initializes user menu section behavior. */
function userMenuInit() {
  const root = document.querySelector(USER_MENU_ROOT_SELECTOR);
  const backdrop = document.querySelector(USER_MENU_BACKDROP_SELECTOR);
  const closeButton = document.querySelector(USER_MENU_CLOSE_BTN_SELECTOR);
  const openButtons = document.querySelectorAll(USER_MENU_OPEN_BTN_SELECTOR);
  const authButtons = document.querySelectorAll(USER_MENU_AUTH_BTN_SELECTOR);
  const signedOutView = document.querySelector(USER_MENU_SIGNED_OUT_VIEW_SELECTOR);
  const signedInView = document.querySelector(USER_MENU_SIGNED_IN_VIEW_SELECTOR);
  const authBar = document.querySelector(USER_MENU_AUTH_BAR_SELECTOR);
  const authTrack = document.querySelector(USER_MENU_AUTH_TRACK_SELECTOR);
  const signInView = document.querySelector(USER_MENU_SIGN_IN_VIEW_SELECTOR);
  const signUpView = document.querySelector(USER_MENU_SIGN_UP_VIEW_SELECTOR);
  const signInForm = document.querySelector(USER_MENU_SIGN_IN_FORM_SELECTOR);
  const signInInput = document.querySelector(USER_MENU_ACCOUNT_FIELD_SIGNED_OUT_SELECTOR);
  const signUpButton = document.querySelector(USER_MENU_SIGN_UP_BTN_SELECTOR);
  const logoutButton = document.querySelector(USER_MENU_LOGOUT_BTN_SELECTOR);
  const copyButton = document.querySelector(USER_MENU_ACCOUNT_COPY_BTN_SELECTOR);
  const downloadButton = document.querySelector(USER_MENU_ACCOUNT_DOWNLOAD_BTN_SELECTOR);
  const accountInput = document.querySelector(USER_MENU_ACCOUNT_FIELD_SIGNED_IN_SELECTOR);
  const { authState, authKey } = appStateGet();

  if (authState) {
    signedOutView?.classList.add(USER_MENU_HIDDEN_CLASS);
    signedInView?.classList.remove(USER_MENU_HIDDEN_CLASS);
    authBar?.classList.add(USER_MENU_HIDDEN_CLASS);
    if (accountInput) {
      accountInput.value = authKey ?? "";
    }
  } else {
    signedInView?.classList.add(USER_MENU_HIDDEN_CLASS);
    signedOutView?.classList.remove(USER_MENU_HIDDEN_CLASS);
    authBar?.classList.remove(USER_MENU_HIDDEN_CLASS);

    authTrack?.classList.toggle(USER_MENU_AUTH_SIGN_IN_CLASS, userMenuAuthView === USER_MENU_AUTH_VIEW_SIGN_IN);
    authTrack?.classList.toggle(USER_MENU_AUTH_SIGN_UP_CLASS, userMenuAuthView === USER_MENU_AUTH_VIEW_SIGN_UP);

    signInView?.classList.toggle(USER_MENU_HIDDEN_CLASS, userMenuAuthView !== USER_MENU_AUTH_VIEW_SIGN_IN);
    signUpView?.classList.toggle(USER_MENU_HIDDEN_CLASS, userMenuAuthView !== USER_MENU_AUTH_VIEW_SIGN_UP);

    authButtons.forEach((button) => {
      button.classList.toggle(USER_MENU_VIEW_ACTIVE_AUTH, button.dataset.view === userMenuAuthView);
    });
  }

  signInForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    await userMenuAuthAnimation(accountActionSignIn(signInInput?.value ?? ""), async () => {
      const signedInKey = await accountStorageGet();
      appStateSet({ authState: true, authKey: signedInKey });
      bodyInit();
      searchBarInit();

      signedOutView?.classList.add(USER_MENU_HIDDEN_CLASS);
      signedInView?.classList.remove(USER_MENU_HIDDEN_CLASS);
      authBar?.classList.add(USER_MENU_HIDDEN_CLASS);
      if (accountInput) {
        accountInput.value = signedInKey ?? "";
      }
    });
  });

  signUpButton?.addEventListener("click", async () => {
    await userMenuAuthAnimation(accountActionSignUp(), async () => {
      const signedUpKey = await accountStorageGet();
      appStateSet({ authState: true, authKey: signedUpKey });
      bodyInit();
      searchBarInit();

      signedOutView?.classList.add(USER_MENU_HIDDEN_CLASS);
      signedInView?.classList.remove(USER_MENU_HIDDEN_CLASS);
      authBar?.classList.add(USER_MENU_HIDDEN_CLASS);
      if (accountInput) {
        accountInput.value = signedUpKey ?? "";
      }
    });
  });

  logoutButton?.addEventListener("click", async () => {
    await userMenuAuthAnimation(accountActionSignOut(), async () => {
      appStateSet({ authState: false, authKey: null });
      bodyInit();
      searchBarInit();

      signedInView?.classList.add(USER_MENU_HIDDEN_CLASS);
      signedOutView?.classList.remove(USER_MENU_HIDDEN_CLASS);
      authBar?.classList.remove(USER_MENU_HIDDEN_CLASS);

      authTrack?.classList.toggle(USER_MENU_AUTH_SIGN_IN_CLASS, userMenuAuthView === USER_MENU_AUTH_VIEW_SIGN_IN);
      authTrack?.classList.toggle(USER_MENU_AUTH_SIGN_UP_CLASS, userMenuAuthView === USER_MENU_AUTH_VIEW_SIGN_UP);

      signInView?.classList.toggle(USER_MENU_HIDDEN_CLASS, userMenuAuthView !== USER_MENU_AUTH_VIEW_SIGN_IN);
      signUpView?.classList.toggle(USER_MENU_HIDDEN_CLASS, userMenuAuthView !== USER_MENU_AUTH_VIEW_SIGN_UP);

      authButtons.forEach((button) => {
        button.classList.toggle(USER_MENU_VIEW_ACTIVE_AUTH, button.dataset.view === userMenuAuthView);
      });
    });
  });

  copyButton?.addEventListener("click", async () => {
    const accountNumber = accountInput?.value ?? "";
    if (!accountNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(accountNumber);
    } catch {
      return;
    }

    if (copyButton.classList.contains(USER_MENU_ACCOUNT_ACTION_SUCCESS_CLASS)) {
      return;
    }

    copyButton.classList.add(USER_MENU_ACCOUNT_ACTION_SUCCESS_CLASS);
    await new Promise((resolve) => setTimeout(resolve, USER_MENU_ACCOUNT_ACTION_SUCCESS_HOLD_MS));
    copyButton.classList.remove(USER_MENU_ACCOUNT_ACTION_SUCCESS_CLASS);
    await new Promise((resolve) => setTimeout(resolve, USER_MENU_ACCOUNT_ACTION_FADE_MS));
  });

  downloadButton?.addEventListener("click", async () => {
    const accountNumber = accountInput?.value ?? "";
    if (!accountNumber) {
      return;
    }

    const blob = new Blob([accountNumber], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pc-authenticator-account.txt";
    link.click();
    URL.revokeObjectURL(url);

    if (downloadButton.classList.contains(USER_MENU_ACCOUNT_ACTION_SUCCESS_CLASS)) {
      return;
    }

    downloadButton.classList.add(USER_MENU_ACCOUNT_ACTION_SUCCESS_CLASS);
    await new Promise((resolve) => setTimeout(resolve, USER_MENU_ACCOUNT_ACTION_SUCCESS_HOLD_MS));
    downloadButton.classList.remove(USER_MENU_ACCOUNT_ACTION_SUCCESS_CLASS);
    await new Promise((resolve) => setTimeout(resolve, USER_MENU_ACCOUNT_ACTION_FADE_MS));
  });

  authButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;
      if (view !== USER_MENU_AUTH_VIEW_SIGN_IN && view !== USER_MENU_AUTH_VIEW_SIGN_UP) {
        return;
      }

      userMenuAuthView = view;

      authTrack?.classList.toggle(USER_MENU_AUTH_SIGN_IN_CLASS, userMenuAuthView === USER_MENU_AUTH_VIEW_SIGN_IN);
      authTrack?.classList.toggle(USER_MENU_AUTH_SIGN_UP_CLASS, userMenuAuthView === USER_MENU_AUTH_VIEW_SIGN_UP);

      signInView?.classList.toggle(USER_MENU_HIDDEN_CLASS, userMenuAuthView !== USER_MENU_AUTH_VIEW_SIGN_IN);
      signUpView?.classList.toggle(USER_MENU_HIDDEN_CLASS, userMenuAuthView !== USER_MENU_AUTH_VIEW_SIGN_UP);

      authButtons.forEach((authButton) => {
        authButton.classList.toggle(USER_MENU_VIEW_ACTIVE_AUTH, authButton.dataset.view === userMenuAuthView);
      });
    });
  });

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (root?.classList.contains(USER_MENU_PANEL_OPEN_CLASS)) {
        void userMenuCloseAnimation();
        return;
      }

      void userMenuOpenAnimation();
    });
  });

  closeButton?.addEventListener("click", () => {
    void userMenuCloseAnimation();
  });

  backdrop?.addEventListener("click", () => {
    void userMenuCloseAnimation();
  });

  root?.addEventListener("click", (event) => {
    if (event.target !== root) {
      return;
    }

    void userMenuCloseAnimation();
  });
}

export { userMenuInit };
export { userMenuAuthAnimation, userMenuCloseAnimation, userMenuOpenAnimation } from "@/js/sections/user-menu/user-menu.animations.js";

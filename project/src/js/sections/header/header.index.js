import { appStateGet, appStateSubscribe } from "@/js/app/app.state.js";
import { HEADER_HIDDEN_CLASS, HEADER_SIGNED_IN_VIEW_SELECTOR, HEADER_SIGNED_OUT_VIEW_SELECTOR } from "@/js/const/const.header.js";
import { headerFadeIn } from "@/js/sections/header/header.animations.js";

/** Updates header view based on current auth state and triggers fade-in animation. */
function headerRender(state = appStateGet()) {
  const headerSignedOut = document.querySelector(HEADER_SIGNED_OUT_VIEW_SELECTOR);
  const headerSignedIn = document.querySelector(HEADER_SIGNED_IN_VIEW_SELECTOR);

  if (state.authState) {
    headerSignedOut?.classList.add(HEADER_HIDDEN_CLASS);
    headerSignedIn?.classList.remove(HEADER_HIDDEN_CLASS);
  } else {
    headerSignedIn?.classList.add(HEADER_HIDDEN_CLASS);
    headerSignedOut?.classList.remove(HEADER_HIDDEN_CLASS);
  }

  void headerFadeIn();
}

/** Initializes header section behavior and subscribes to state changes. */
function headerInit() {
  headerRender();
  appStateSubscribe(headerRender);
}

export { headerInit, headerRender };
export { headerFadeIn } from "@/js/sections/header/header.animations.js";



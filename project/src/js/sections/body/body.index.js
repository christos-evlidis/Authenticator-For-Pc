import { appStateGet } from "@/js/app/app.state.js";
import { BODY_CODES_NO_VIEW_SELECTOR, BODY_CODES_YES_VIEW_SELECTOR, BODY_HIDDEN_CLASS, BODY_SIGNED_IN_VIEW_SELECTOR, BODY_SIGNED_OUT_VIEW_SELECTOR } from "@/js/const/const.body.js";
import { HEADER_HIDDEN_CLASS, HEADER_SIGNED_IN_VIEW_SELECTOR, HEADER_SIGNED_OUT_VIEW_SELECTOR } from "@/js/const/const.header.js";


/** Initializes body section from current app state. */
function bodyInit() {
  const { authState } = appStateGet();
  const headerSignedOut = document.querySelector(HEADER_SIGNED_OUT_VIEW_SELECTOR);
  const headerSignedIn = document.querySelector(HEADER_SIGNED_IN_VIEW_SELECTOR);
  const bodySignedOut = document.querySelector(BODY_SIGNED_OUT_VIEW_SELECTOR);
  const bodySignedIn = document.querySelector(BODY_SIGNED_IN_VIEW_SELECTOR);
  const codesNo = document.querySelector(BODY_CODES_NO_VIEW_SELECTOR);
  const codesYes = document.querySelector(BODY_CODES_YES_VIEW_SELECTOR);

  if (authState) {
    headerSignedOut?.classList.add(HEADER_HIDDEN_CLASS);
    headerSignedIn?.classList.remove(HEADER_HIDDEN_CLASS);
    bodySignedOut?.classList.add(BODY_HIDDEN_CLASS);
    bodySignedIn?.classList.remove(BODY_HIDDEN_CLASS);
    codesNo?.classList.remove(BODY_HIDDEN_CLASS);
    codesYes?.classList.add(BODY_HIDDEN_CLASS);
    return;
  }

  headerSignedIn?.classList.add(HEADER_HIDDEN_CLASS);
  headerSignedOut?.classList.remove(HEADER_HIDDEN_CLASS);
  bodySignedIn?.classList.add(BODY_HIDDEN_CLASS);
  bodySignedOut?.classList.remove(BODY_HIDDEN_CLASS);
}

export { bodyInit };
export { bodyFadeIn } from "@/js/sections/body/body.animations.js";
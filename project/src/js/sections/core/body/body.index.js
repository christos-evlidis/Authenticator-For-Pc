import { appStateGet, appStateSubscribe } from "@/js/app/app.state.js";
import { BODY_CODES_NO_VIEW_SELECTOR, BODY_CODES_YES_VIEW_SELECTOR, BODY_HIDDEN_CLASS, BODY_SIGNED_IN_VIEW_SELECTOR, BODY_SIGNED_OUT_VIEW_SELECTOR } from "@/js/sections/core/body/body.const.js";
import { bodyFadeIn } from "@/js/sections/core/body/body.animations.js";

/** Updates body section view from current app state and triggers fade-in animation. */
function bodyRender(state = appStateGet()) {
  const bodySignedOut = document.querySelector(BODY_SIGNED_OUT_VIEW_SELECTOR);
  const bodySignedIn = document.querySelector(BODY_SIGNED_IN_VIEW_SELECTOR);
  const codesNo = document.querySelector(BODY_CODES_NO_VIEW_SELECTOR);
  const codesYes = document.querySelector(BODY_CODES_YES_VIEW_SELECTOR);

  if (state.authState) {
    bodySignedOut?.classList.add(BODY_HIDDEN_CLASS);
    bodySignedIn?.classList.remove(BODY_HIDDEN_CLASS);
  } else {
    bodySignedIn?.classList.add(BODY_HIDDEN_CLASS);
    bodySignedOut?.classList.remove(BODY_HIDDEN_CLASS);
    codesYes?.classList.add(BODY_HIDDEN_CLASS);
    codesNo?.classList.remove(BODY_HIDDEN_CLASS);
  }

  void bodyFadeIn();
}

/** Initializes body section and subscribes to state changes. */
function bodyInit() {
  bodyRender();
  appStateSubscribe(bodyRender);
}

export { bodyInit, bodyRender };
export { bodyFadeIn } from "@/js/sections/core/body/body.animations.js";
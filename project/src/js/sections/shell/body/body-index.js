import { BODY_ACTIVE_CLASS } from "../../../const/const.body.js";
import { BODY_CODES_NO_VIEW_SELECTOR } from "../../../const/const.body.js";
import { BODY_CODES_YES_VIEW_SELECTOR } from "../../../const/const.body.js";
import { BODY_HIDDEN_CLASS } from "../../../const/const.body.js";
import { BODY_ROOT_SELECTOR } from "../../../const/const.body.js";
import { BODY_SIGNED_IN_VIEW_SELECTOR } from "../../../const/const.body.js";
import { BODY_SIGNED_OUT_VIEW_SELECTOR } from "../../../const/const.body.js";
import { CODES_HIDDEN_CLASS } from "../../../const/const.codes.js";
import { CODES_ROOT_SELECTOR } from "../../../const/const.codes.js";

function _bodyInit(isSignedIn, options = {}) {
  const signedOutView = document.querySelector(BODY_SIGNED_OUT_VIEW_SELECTOR);
  const signedInView = document.querySelector(BODY_SIGNED_IN_VIEW_SELECTOR);
  signedOutView?.classList.toggle(BODY_HIDDEN_CLASS, isSignedIn);
  signedInView?.classList.toggle(BODY_HIDDEN_CLASS, !isSignedIn);
  if (isSignedIn) {
    const showCodes = options.stateCodes === true;
    const codesYesView = document.querySelector(BODY_CODES_YES_VIEW_SELECTOR);
    const codesNoView = document.querySelector(BODY_CODES_NO_VIEW_SELECTOR);
    codesYesView?.classList.toggle(BODY_HIDDEN_CLASS, !showCodes);
    codesNoView?.classList.toggle(BODY_HIDDEN_CLASS, showCodes);
    document.querySelector(CODES_ROOT_SELECTOR)?.classList.toggle(CODES_HIDDEN_CLASS, !showCodes);
    document.querySelector(BODY_ROOT_SELECTOR)?.classList.remove(BODY_ACTIVE_CLASS);
  }
}

function _bodyApplySignedIn(options = {}) {
  _bodyInit(true, { stateCodes: options.stateCodes });
}

function _bodyApplySignedOut() {
  _bodyInit(false, { stateCodes: false });
}

export {
  _bodyInit as bodyInit,
  _bodyApplySignedIn as bodyApplySignedIn,
  _bodyApplySignedOut as bodyApplySignedOut,
};

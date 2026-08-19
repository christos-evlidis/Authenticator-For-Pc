import { CODES_DEFAULT_CONTACT } from "../../../../const/const.codes.js";
import { CODES_EMAIL_PLACEHOLDER } from "../../../../const/const.codes.js";

/** Normalizes editable contact text, treating placeholder as empty. */
function _codesUtilContactNormalize(text) {
  const trimmed = String(text ?? "").trim();

  if (!trimmed || trimmed === CODES_EMAIL_PLACEHOLDER) {
    return "";
  }

  return trimmed;
}

/** Returns the contact line shown on an account card. */
function _codesUtilContactDisplay(account) {
  if (account.email) {
    return account.email;
  }

  if (account.username) {
    return account.username;
  }

  return CODES_EMAIL_PLACEHOLDER;
}

/** Returns whether a string is a valid email address. */
function _codesUtilEmailValid(email) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

export { CODES_DEFAULT_CONTACT };
export {
  _codesUtilContactDisplay as codesUtilContactDisplay,
  _codesUtilContactNormalize as codesUtilContactNormalize,
  _codesUtilEmailValid as codesUtilEmailValid,
};

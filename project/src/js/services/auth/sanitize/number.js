import { AUTH_NUMBER_LENGTH } from "../../../const/const.auth.js";

/** Strips non-digits and truncates to the auth number length. */
function authSanitizeNumber(value) {
  return String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, AUTH_NUMBER_LENGTH);
}

export { authSanitizeNumber };

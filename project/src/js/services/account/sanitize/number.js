import { AUTH_NUMBER_LENGTH } from "@/js/const/const.auth.js";

/** Strips non-digits and truncates to the auth number length. */
function accountSanitizeNumber(value) {
  try {
    return String(value ?? "")
      .replace(/\D/g, "")
      .slice(0, AUTH_NUMBER_LENGTH);
  } catch {
    return "";
  }
}

export { accountSanitizeNumber };

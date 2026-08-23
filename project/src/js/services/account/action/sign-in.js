import { accountApiVerify } from "@/js/services/account/api/verify.js";
import { accountSanitizeNumber } from "@/js/services/account/sanitize/number.js";
import { accountStorageSet } from "@/js/services/account/storage/set.js";

/** Verifies the account number and persists it when sign-in succeeds. */
async function accountActionSignIn(input) {
  try {
    const authKey = accountSanitizeNumber(input);
    const result = await accountApiVerify(authKey);
    if (result) {
      await accountStorageSet(authKey);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export { accountActionSignIn };

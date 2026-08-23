import { accountApiCreate } from "@/js/services/account/api/create.js";
import { accountStorageSet } from "@/js/services/account/storage/set.js";

/** Creates a new account and persists it when sign-up succeeds. */
async function accountActionSignUp() {
  try {
    const result = await accountApiCreate();
    if (result?.ok === true) {
      const authKey = result.data?.auth_key;
      if (!authKey) {
        return false;
      }
      await accountStorageSet(authKey);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export { accountActionSignUp };

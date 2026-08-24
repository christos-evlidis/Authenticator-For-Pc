import { accountStorageClear } from "@/js/services/account/storage/clear.js";
import { vaultActionPurge } from "@/js/services/vault/vault-index.js";

/** Clears stored auth and vault data when sign-out succeeds. */
async function accountActionSignOut() {
  try {
    await accountStorageClear();
    await vaultActionPurge();
    return true;
  } catch {
    return false;
  }
}

export { accountActionSignOut };

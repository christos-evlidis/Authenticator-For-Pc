import { accountStorageClear } from "@/js/services/account/storage/clear.js";
import { vaultStoragePurge } from "@/js/services/vault/vault-index.js";

/** Clears stored auth and vault data when sign-out succeeds. */
async function accountActionSignOut() {
  try {
    await accountStorageClear();
    await vaultStoragePurge();
    return true;
  } catch {
    return false;
  }
}

export { accountActionSignOut };

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import { accountApiVerify, accountStorageGet } from "@/js/services/account/account-index.js";
import { appStateSet } from "@/js/app/app.state.js";

async function appBoot() {
  const authKey = await accountStorageGet();
  const verified = await accountApiVerify(authKey);

  if (!verified || !authKey) {
    appStateSet({ stateAuth: false, authKey: null });
    return { signedIn: false, authKey: null };
  }

  appStateSet({ stateAuth: true, authKey });
  return { signedIn: true, authKey };
}

/** Initializes and starts the application. */
async function appInit() {
  await appBoot();
}

void appInit();

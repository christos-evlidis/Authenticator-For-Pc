import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import { accountApiVerify, accountStorageClear, accountStorageGet } from "@/js/services/account/account-index.js";
import { appStateGet, appStateSet } from "@/js/app/app.state.js";
import { bodyApplyAuthState } from "@/js/sections/body/body.index.js";
import { introInit } from "@/js/sections/intro/intro.index.js";

/** Bootstraps the application: restores auth, applies shell state, and runs the intro sequence. */
async function appInit() {
  const authKey = await accountStorageGet();
  if (!authKey) {
    appStateSet({ authState: false, authKey: null });
  } else {
    const verifyResult = await accountApiVerify(authKey);

    if (verifyResult === true) {
      appStateSet({ authState: true, authKey });
    } else if (verifyResult === false) {
      await accountStorageClear();
      appStateSet({ authState: false, authKey: null });
    } else {
      appStateSet({ authState: false, authKey });
    }
  }
  const { authState } = appStateGet();
  bodyApplyAuthState(authState);
  await introInit();
}

void appInit();
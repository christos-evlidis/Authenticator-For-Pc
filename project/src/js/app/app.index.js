import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import { accountApiVerify, accountStorageClear, accountStorageGet } from "@/js/services/account/account-index.js";
import { appStateSet } from "@/js/app/app.state.js";
import { sectionsInit } from "@/js/sections/sections-index.js";

/** Bootstraps the application: restores auth, applies shell state, and initializes sections. */
async function appInit() {
  const authKey = await accountStorageGet();
  if (!authKey) {
    appStateSet({ authState: false, authKey: null });
  } else {
    const verifyAuth = await accountApiVerify(authKey);

    if (verifyAuth === true) {
      appStateSet({ authState: true, authKey });
    } else if (verifyAuth === false) {
      await accountStorageClear();
      appStateSet({ authState: false, authKey: null });
    } else if (verifyAuth === null) {
      appStateSet({ authState: false, authKey });
    }
  }
  sectionsInit();
}

void appInit();
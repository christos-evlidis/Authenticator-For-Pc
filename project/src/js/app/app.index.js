import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import { accountApiVerify, accountStorageClear, accountStorageGet } from "@/js/services/account/account.index.js";
import { appStateSet } from "@/js/app/app.state.js";
import { sectionsInit } from "@/js/sections/sections.index.js";
import { scanPendingClear, scanPendingGet } from "@/js/services/scan/scan.index.js";
import { vaultActionAddQr } from "@/js/services/vault/action/add/qr.js";

import { qrMenuClose, qrMenuMountOpen } from "@/js/sections/qr-menu/qr-menu.index.js";
import { codesActionAdd } from "@/js/sections/codes/codes.index.js";

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

  // Check if there is a pending QR scan from the background
  let pendingScan = null;
  try {
    pendingScan = await scanPendingGet();
    if (pendingScan) {
      await scanPendingClear();
    }
  } catch (error) {
    console.warn("[appInit] Error reading pending QR scan:", error);
  }

  // If returning from a QR scan, immediately show the QR menu in its open state
  if (pendingScan && pendingScan.status === "ready" && pendingScan.uri) {
    qrMenuMountOpen();
  }

  // Initialize all DOM sections and render current accounts
  sectionsInit();

  if (pendingScan && pendingScan.status === "ready" && pendingScan.uri) {
    // Keep the QR overlay visible for a moment so the user sees it already open
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Smoothly close the QR overlay (panel slides out, backdrop unblurs)
    await qrMenuClose();

    // Brief settle pause after overlay is completely closed
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Save the scanned account to the vault and smoothly slide the card in!
    const added = await vaultActionAddQr(pendingScan.uri);
    if (added) {
      await codesActionAdd(added);
    }
  } else if (pendingScan && pendingScan.status === "error") {
    console.warn("[qr-scan] Scan error:", pendingScan.message);
  }
}

void appInit();
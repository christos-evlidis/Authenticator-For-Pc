import {
  QR_MENU_BACKDROP_SELECTOR,
  QR_MENU_CLOSE_BTN_SELECTOR,
  QR_MENU_OPEN_BTN_SELECTOR,
  QR_MENU_PANEL_OPEN_CLASS,
  QR_MENU_ROOT_SELECTOR,
} from "@/js/const/const.qr-menu.js";
import { qrMenuClose, qrMenuOpen } from "@/js/sections/qr-menu/qr-menu.animations.js";
import { scanStart, scanCancel } from "@/js/services/scan/scan.index.js";
import { MESSAGES } from "@/js/const/const.scan.js";

/** Initializes QR menu section behavior. */
function qrMenuInit() {
  const root = document.querySelector(QR_MENU_ROOT_SELECTOR);
  const backdrop = document.querySelector(QR_MENU_BACKDROP_SELECTOR);
  const closeButton = document.querySelector(QR_MENU_CLOSE_BTN_SELECTOR);
  const openButtons = document.querySelectorAll(QR_MENU_OPEN_BTN_SELECTOR);

  chrome.runtime?.onMessage?.addListener((message) => {
    if (message?.action === MESSAGES.CANCELLED_EVENT) {
      void qrMenuClose();
    }
  });

  openButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      if (root?.classList.contains(QR_MENU_PANEL_OPEN_CLASS)) {
        await scanCancel().catch(() => {});
        void qrMenuClose();
        return;
      }

      await qrMenuOpen();

      try {
        const response = await scanStart();
        if (!response?.success) {
          console.warn("[qr-menu] scanStart returned unsuccessful:", response?.error);
        }
      } catch (error) {
        console.warn("[qr-menu] scanStart failed:", error);
      }
    });
  });

  closeButton?.addEventListener("click", () => {
    void scanCancel().catch(() => {});
    void qrMenuClose();
  });

  backdrop?.addEventListener("click", () => {
    void scanCancel().catch(() => {});
    void qrMenuClose();
  });

  root?.addEventListener("click", (event) => {
    if (event.target !== root) {
      return;
    }

    void scanCancel().catch(() => {});
    void qrMenuClose();
  });
}

export { qrMenuInit };
export { qrMenuClose, qrMenuOpen, qrMenuMountOpen } from "@/js/sections/qr-menu/qr-menu.animations.js";


import {
  QR_MENU_BACKDROP_SELECTOR,
  QR_MENU_CLOSE_BTN_SELECTOR,
  QR_MENU_OPEN_BTN_SELECTOR,
  QR_MENU_PANEL_OPEN_CLASS,
  QR_MENU_ROOT_SELECTOR,
} from "@/js/sections/overlays/qr-menu/qr-menu.const.js";
import { qrMenuClose, qrMenuOpen } from "@/js/sections/overlays/qr-menu/qr-menu.animations.js";

/** Initializes QR menu section behavior. */
function qrMenuInit() {
  const root = document.querySelector(QR_MENU_ROOT_SELECTOR);
  const backdrop = document.querySelector(QR_MENU_BACKDROP_SELECTOR);
  const closeButton = document.querySelector(QR_MENU_CLOSE_BTN_SELECTOR);
  const openButtons = document.querySelectorAll(QR_MENU_OPEN_BTN_SELECTOR);

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (root?.classList.contains(QR_MENU_PANEL_OPEN_CLASS)) {
        void qrMenuClose();
        return;
      }

      void qrMenuOpen();
    });
  });

  closeButton?.addEventListener("click", () => {
    void qrMenuClose();
  });

  backdrop?.addEventListener("click", () => {
    void qrMenuClose();
  });

  root?.addEventListener("click", (event) => {
    if (event.target !== root) {
      return;
    }

    void qrMenuClose();
  });
}

export { qrMenuInit };
export { qrMenuClose, qrMenuOpen } from "@/js/sections/overlays/qr-menu/qr-menu.animations.js";

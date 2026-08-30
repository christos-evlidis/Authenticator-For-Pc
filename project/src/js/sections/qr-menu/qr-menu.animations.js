import { QR_MENU_OPEN_CLASS, QR_MENU_OPEN_MS, QR_MENU_ROOT_SELECTOR } from "@/js/const/const.qr-menu.js";

/** Opens the QR menu panel. */
async function qrMenuOpen() {
  const element = document.querySelector(QR_MENU_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.add(QR_MENU_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, QR_MENU_OPEN_MS));
}

/** Closes the QR menu panel. */
async function qrMenuClose() {
  const element = document.querySelector(QR_MENU_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove(QR_MENU_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, QR_MENU_OPEN_MS));
}

export { qrMenuClose, qrMenuOpen };

import { QR_MENU_BACKDROP_CLOSING_CLASS, QR_MENU_BACKDROP_VISIBLE_CLASS, QR_MENU_BLUR_MS, QR_MENU_HEADER_BTN_ACTIVE_CLASS, QR_MENU_OPEN_BTN_SELECTOR, QR_MENU_OPEN_CLASS, QR_MENU_PANEL_CLOSING_CLASS, QR_MENU_PANEL_MOUNTED_CLASS, QR_MENU_PANEL_OPEN_CLASS, QR_MENU_ROOT_SELECTOR, QR_MENU_SLIDE_MS } from "@/js/const/overlays/const.qr-menu.js";

let qrMenuIsOpen = false;
let qrMenuIsAnimating = false;

/** Opens the QR menu: blur backdrop, then slide in the panel. */
async function qrMenuOpen() {
  const root = document.querySelector(QR_MENU_ROOT_SELECTOR);
  if (!root || qrMenuIsAnimating || qrMenuIsOpen) {
    return;
  }

  qrMenuIsAnimating = true;

  document.querySelectorAll(QR_MENU_OPEN_BTN_SELECTOR).forEach((button) => {
    button.classList.add(QR_MENU_HEADER_BTN_ACTIVE_CLASS);
  });

  root.classList.add(QR_MENU_OPEN_CLASS);
  root.classList.add(QR_MENU_BACKDROP_VISIBLE_CLASS);
  await new Promise((resolve) => setTimeout(resolve, QR_MENU_BLUR_MS));

  root.classList.add(QR_MENU_PANEL_MOUNTED_CLASS);
  root.classList.add(QR_MENU_PANEL_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, QR_MENU_SLIDE_MS));

  qrMenuIsOpen = true;
  qrMenuIsAnimating = false;
}

/** Closes the QR menu: slide out panel, then unblur backdrop. */
async function qrMenuClose() {
  const root = document.querySelector(QR_MENU_ROOT_SELECTOR);
  if (!root || qrMenuIsAnimating || !qrMenuIsOpen) {
    return;
  }

  qrMenuIsAnimating = true;

  document.querySelectorAll(QR_MENU_OPEN_BTN_SELECTOR).forEach((button) => {
    button.classList.remove(QR_MENU_HEADER_BTN_ACTIVE_CLASS);
  });

  root.classList.remove(QR_MENU_PANEL_OPEN_CLASS);
  root.classList.add(QR_MENU_PANEL_CLOSING_CLASS);
  await new Promise((resolve) => setTimeout(resolve, QR_MENU_SLIDE_MS));
  root.classList.remove(QR_MENU_PANEL_CLOSING_CLASS);
  root.classList.remove(QR_MENU_PANEL_MOUNTED_CLASS);

  root.classList.remove(QR_MENU_BACKDROP_VISIBLE_CLASS);
  root.classList.add(QR_MENU_BACKDROP_CLOSING_CLASS);
  await new Promise((resolve) => setTimeout(resolve, QR_MENU_BLUR_MS));
  root.classList.remove(QR_MENU_BACKDROP_CLOSING_CLASS);

  root.classList.remove(QR_MENU_OPEN_CLASS);
  qrMenuIsOpen = false;
  qrMenuIsAnimating = false;
}

export { qrMenuClose, qrMenuOpen };

import { MANUAL_MENU_BACKDROP_CLOSING_CLASS, MANUAL_MENU_BACKDROP_VISIBLE_CLASS, MANUAL_MENU_BLUR_MS, MANUAL_MENU_HEADER_BTN_ACTIVE_CLASS, MANUAL_MENU_OPEN_BTN_SELECTOR, MANUAL_MENU_OPEN_CLASS, MANUAL_MENU_PANEL_CLOSING_CLASS, MANUAL_MENU_PANEL_MOUNTED_CLASS, MANUAL_MENU_PANEL_OPEN_CLASS, MANUAL_MENU_ROOT_SELECTOR, MANUAL_MENU_SLIDE_MS } from "@/js/const/const.manual-menu.js";

let manualMenuIsOpen = false;
let manualMenuIsAnimating = false;

/** Opens the manual menu: blur backdrop, then slide in the panel. */
async function manualMenuOpen() {
  const root = document.querySelector(MANUAL_MENU_ROOT_SELECTOR);
  if (!root || manualMenuIsAnimating || manualMenuIsOpen) {
    return;
  }

  manualMenuIsAnimating = true;

  document.querySelectorAll(MANUAL_MENU_OPEN_BTN_SELECTOR).forEach((button) => {
    button.classList.add(MANUAL_MENU_HEADER_BTN_ACTIVE_CLASS);
  });

  root.classList.add(MANUAL_MENU_OPEN_CLASS);
  root.classList.add(MANUAL_MENU_BACKDROP_VISIBLE_CLASS);
  await new Promise((resolve) => setTimeout(resolve, MANUAL_MENU_BLUR_MS));

  root.classList.add(MANUAL_MENU_PANEL_MOUNTED_CLASS);
  root.classList.add(MANUAL_MENU_PANEL_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, MANUAL_MENU_SLIDE_MS));

  manualMenuIsOpen = true;
  manualMenuIsAnimating = false;
}

/** Closes the manual menu: slide out panel, then unblur backdrop. */
async function manualMenuClose() {
  const root = document.querySelector(MANUAL_MENU_ROOT_SELECTOR);
  if (!root || manualMenuIsAnimating || !manualMenuIsOpen) {
    return;
  }

  manualMenuIsAnimating = true;

  document.querySelectorAll(MANUAL_MENU_OPEN_BTN_SELECTOR).forEach((button) => {
    button.classList.remove(MANUAL_MENU_HEADER_BTN_ACTIVE_CLASS);
  });

  root.classList.remove(MANUAL_MENU_PANEL_OPEN_CLASS);
  root.classList.add(MANUAL_MENU_PANEL_CLOSING_CLASS);
  await new Promise((resolve) => setTimeout(resolve, MANUAL_MENU_SLIDE_MS));
  root.classList.remove(MANUAL_MENU_PANEL_CLOSING_CLASS);
  root.classList.remove(MANUAL_MENU_PANEL_MOUNTED_CLASS);

  root.classList.remove(MANUAL_MENU_BACKDROP_VISIBLE_CLASS);
  root.classList.add(MANUAL_MENU_BACKDROP_CLOSING_CLASS);
  await new Promise((resolve) => setTimeout(resolve, MANUAL_MENU_BLUR_MS));
  root.classList.remove(MANUAL_MENU_BACKDROP_CLOSING_CLASS);

  root.classList.remove(MANUAL_MENU_OPEN_CLASS);
  manualMenuIsOpen = false;
  manualMenuIsAnimating = false;
}

export { manualMenuClose, manualMenuOpen };

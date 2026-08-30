import { MANUAL_MENU_OPEN_CLASS, MANUAL_MENU_OPEN_MS, MANUAL_MENU_ROOT_SELECTOR } from "@/js/const/const.manual-menu.js";

/** Opens the manual menu panel. */
async function manualMenuOpen() {
  const element = document.querySelector(MANUAL_MENU_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.add(MANUAL_MENU_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, MANUAL_MENU_OPEN_MS));
}

/** Closes the manual menu panel. */
async function manualMenuClose() {
  const element = document.querySelector(MANUAL_MENU_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove(MANUAL_MENU_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, MANUAL_MENU_OPEN_MS));
}

export { manualMenuClose, manualMenuOpen };

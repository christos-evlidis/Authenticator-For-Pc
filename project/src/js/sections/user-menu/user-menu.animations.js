import {
  USER_MENU_OPEN_CLASS,
  USER_MENU_OPEN_MS,
  USER_MENU_ROOT_SELECTOR,
} from "@/js/const/const.user-menu.js";

/** Opens the user menu panel. */
async function userMenuOpen() {
  const element = document.querySelector(USER_MENU_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.add(USER_MENU_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_OPEN_MS));
}

/** Closes the user menu panel. */
async function userMenuClose() {
  const element = document.querySelector(USER_MENU_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove(USER_MENU_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_OPEN_MS));
}

export { userMenuClose, userMenuOpen };

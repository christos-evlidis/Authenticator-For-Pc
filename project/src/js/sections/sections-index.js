import { bodyInit } from "@/js/sections/body/body.index.js";
import { headerInit } from "@/js/sections/header/header.index.js";
import { manualMenuInit } from "@/js/sections/manual-menu/manual-menu.index.js";
import { qrMenuInit } from "@/js/sections/qr-menu/qr-menu.index.js";
import { searchBarInit } from "@/js/sections/search-bar/search-bar.index.js";
import { userMenuInit } from "@/js/sections/user-menu/user-menu.index.js";

/** Initializes all sections from current app state. */
function sectionsInit() {
  headerInit();
  bodyInit();
  searchBarInit();
  userMenuInit();
  manualMenuInit();
  qrMenuInit();
}

export { sectionsInit };
export { headerFadeIn, headerInit } from "@/js/sections/header/header.index.js";
export { bodyFadeIn, bodyInit } from "@/js/sections/body/body.index.js";
export { searchBarInit } from "@/js/sections/search-bar/search-bar.index.js";
export { userMenuAuthAnimation, userMenuCloseAnimation, userMenuInit, userMenuOpenAnimation } from "@/js/sections/user-menu/user-menu.index.js";
export { manualMenuClose, manualMenuInit, manualMenuOpen } from "@/js/sections/manual-menu/manual-menu.index.js";
export { qrMenuClose, qrMenuInit, qrMenuOpen } from "@/js/sections/qr-menu/qr-menu.index.js";

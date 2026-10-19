import { bodyInit } from "@/js/sections/core/body/body.index.js";
import { codesInit } from "@/js/sections/core/codes/codes.index.js";
import { headerInit } from "@/js/sections/core/header/header.index.js";
import { searchBarInit } from "@/js/sections/core/search-bar/search-bar.index.js";
import { manualMenuInit } from "@/js/sections/overlays/manual-menu/manual-menu.index.js";
import { qrMenuInit } from "@/js/sections/overlays/qr-menu/qr-menu.index.js";
import { userMenuInit } from "@/js/sections/overlays/user-menu/user-menu.index.js";

/** Initializes all sections from current app state. */
function sectionsInit() {
  headerInit();
  bodyInit();
  codesInit();
  searchBarInit();
  userMenuInit();
  manualMenuInit();
  qrMenuInit();
}

export { sectionsInit };
export { headerFadeIn, headerInit, headerRender } from "@/js/sections/core/header/header.index.js";
export { bodyFadeIn, bodyInit, bodyRender } from "@/js/sections/core/body/body.index.js";
export { codesActionAdd, codesAnimationDelete, codesInit, codesRender } from "@/js/sections/core/codes/codes.index.js";
export { searchBarFadeIn, searchBarInit, searchBarRender } from "@/js/sections/core/search-bar/search-bar.index.js";
export { userMenuAuthAnimation, userMenuClose, userMenuInit, userMenuOpen } from "@/js/sections/overlays/user-menu/user-menu.index.js";
export { manualMenuClose, manualMenuInit, manualMenuOpen } from "@/js/sections/overlays/manual-menu/manual-menu.index.js";
export { qrMenuClose, qrMenuInit, qrMenuOpen } from "@/js/sections/overlays/qr-menu/qr-menu.index.js";



import { bodyInit } from "@/js/sections/body/body.index.js";
import { codesInit } from "@/js/sections/codes/codes.index.js";
import { headerInit } from "@/js/sections/header/header.index.js";
import { searchBarInit } from "@/js/sections/search-bar/search-bar.index.js";
import { manualMenuInit } from "@/js/sections/manual-menu/manual-menu.index.js";
import { qrMenuInit } from "@/js/sections/qr-menu/qr-menu.index.js";
import { userMenuInit } from "@/js/sections/user-menu/user-menu.index.js";

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
export { headerFadeIn, headerInit, headerRender } from "@/js/sections/header/header.index.js";
export { bodyFadeIn, bodyInit, bodyRender } from "@/js/sections/body/body.index.js";
export { codesActionAdd, codesAnimationAddSlide, codesAnimationAddSpacerExpand, codesAnimationDelete, codesInit, codesRender } from "@/js/sections/codes/codes.index.js";
export { searchBarCollapse, searchBarExpand, searchBarFadeIn, searchBarFadeOut, searchBarInit, searchBarRender } from "@/js/sections/search-bar/search-bar.index.js";
export { userMenuAuthAnimation, userMenuClose, userMenuInit, userMenuOpen } from "@/js/sections/user-menu/user-menu.index.js";
export { manualMenuClose, manualMenuInit, manualMenuOpen } from "@/js/sections/manual-menu/manual-menu.index.js";
export { qrMenuClose, qrMenuInit, qrMenuMountOpen, qrMenuOpen } from "@/js/sections/qr-menu/qr-menu.index.js";

import { HEADER_SCAN_QR_BTN_SELECTOR } from "@/js/sections/core/header/header.const.js";

// Root selectors.
export const QR_MENU_ROOT_SELECTOR = ".app-qr-menu";
export const QR_MENU_BACKDROP_SELECTOR = ".app-qr-menu__backdrop";
export const QR_MENU_PANEL_SELECTOR = ".app-qr-menu__panel";
export const QR_MENU_CLOSE_BTN_SELECTOR = ".app-qr-menu__close-btn";
export const QR_MENU_OPEN_BTN_SELECTOR = HEADER_SCAN_QR_BTN_SELECTOR;

// Shared state classes.
export const QR_MENU_HIDDEN_CLASS = "is-hidden";
export const QR_MENU_OPEN_CLASS = "is-open";
export const QR_MENU_BACKDROP_VISIBLE_CLASS = "is-backdrop-visible";
export const QR_MENU_BACKDROP_CLOSING_CLASS = "is-backdrop-closing";
export const QR_MENU_PANEL_MOUNTED_CLASS = "is-panel-mounted";
export const QR_MENU_PANEL_OPEN_CLASS = "is-panel-open";
export const QR_MENU_PANEL_CLOSING_CLASS = "is-panel-closing";

export const QR_MENU_HEADER_BTN_ACTIVE_CLASS = "is-qr-menu-btn-active";

// Panel open / close animation (timing matches motion.css tokens).
export const QR_MENU_BLUR_MS = 250;
export const QR_MENU_SLIDE_MS = 250;
export const QR_MENU_OPEN_MS = 250;


import { HEADER_MANUAL_MENU_BTN_SELECTOR } from "@/js/const/const.header.js";

// Root selectors.
export const MANUAL_MENU_ROOT_SELECTOR = ".app-manual-menu";
export const MANUAL_MENU_BACKDROP_SELECTOR = ".app-manual-menu__backdrop";
export const MANUAL_MENU_PANEL_SELECTOR = ".app-manual-menu__panel";
export const MANUAL_MENU_HEADER_SELECTOR = ".app-manual-menu__header";
export const MANUAL_MENU_CONTENT_SELECTOR = ".app-manual-menu__content";
export const MANUAL_MENU_BODY_SELECTOR = ".app-manual-menu__body";
export const MANUAL_MENU_FORM_SELECTOR = ".app-manual-menu__form";
export const MANUAL_MENU_CLOSE_BTN_SELECTOR = ".app-manual-menu__close-btn";
export const MANUAL_MENU_OPEN_BTN_SELECTOR = HEADER_MANUAL_MENU_BTN_SELECTOR;

export const MANUAL_MENU_OTP_TYPE_TRACK_SELECTOR = ".app-manual-menu__type-track";
export const MANUAL_MENU_OTP_TYPE_BTN_SELECTOR = ".app-manual-menu__type-btn";

// Shared state classes.
export const MANUAL_MENU_HIDDEN_CLASS = "is-hidden";
export const MANUAL_MENU_ACTIVE_CLASS = "is-active";
export const MANUAL_MENU_OPEN_CLASS = "is-open";
export const MANUAL_MENU_SUBMITTING_CLASS = "is-submitting";

export const MANUAL_MENU_HEADER_BTN_ACTIVE_CLASS = "is-manual-menu-btn-active";

// Animation (timing matches --slide-ms in motion.css).
export const MANUAL_MENU_OPEN_MS = 250;

// Status selectors.
export const MANUAL_MENU_STATUS_LOADING_SELECTOR =
  ".app-manual-menu__status .app-manual-menu-status--loading";
export const MANUAL_MENU_STATUS_SUCCESS_SELECTOR =
  ".app-manual-menu__status .app-manual-menu-status--success";
export const MANUAL_MENU_STATUS_ERROR_SELECTOR =
  ".app-manual-menu__status .app-manual-menu-status--error";
export const MANUAL_MENU_STATUS_ICON_CIRCLE_SELECTOR = ".app-manual-menu-status__icon-circle";
export const MANUAL_MENU_STATUS_ICON_MARK_SELECTOR = ".app-manual-menu-status__icon-mark";

// Overlay shell selectors.
export const USER_MENU_ROOT_SELECTOR = ".app-user-menu";
export const USER_MENU_BACKDROP_SELECTOR = ".app-user-menu__backdrop";
export const USER_MENU_PANEL_SELECTOR = ".app-user-menu__panel";
export const USER_MENU_HEADER_SELECTOR = ".app-user-menu__header";
export const USER_MENU_CONTENT_SELECTOR = ".app-user-menu__content";
export const USER_MENU_ANIMATION_CONTAINER_SELECTOR = ".app-user-menu__animation-container";
export const USER_MENU_BODY_SELECTOR = ".app-user-menu__body";
export const USER_MENU_CLOSE_BTN_SELECTOR = ".app-user-menu__close-btn";
export const USER_MENU_OPEN_BTN_SELECTOR = ".app-header__btn--user-menu";

export const USER_MENU_HEADER_BTN_ACTIVE_CLASS = "is-user-menu-btn-active";

export const USER_MENU_SIGNED_OUT_VIEW_SELECTOR =
  ".app-user-menu__view--signed-out";
export const USER_MENU_SIGNED_IN_VIEW_SELECTOR =
  ".app-user-menu__view--signed-in";

export const USER_MENU_AUTH_BAR_SELECTOR = ".app-user-menu__auth-bar";
export const USER_MENU_AUTH_TRACK_SELECTOR =
  ".app-user-menu__auth-switch-track";
export const USER_MENU_AUTH_THUMB_SELECTOR =
  ".app-user-menu__auth-switch-thumb";
export const USER_MENU_AUTH_BTN_SELECTOR = ".app-user-menu__auth-switch-btn";

export const USER_MENU_SIGN_IN_VIEW_SELECTOR =
  ".app-user-menu__auth-view--sign-in";
export const USER_MENU_SIGN_IN_FORM_SELECTOR = ".app-user-menu__form--sign-in";
export const USER_MENU_ACCOUNT_FIELD_SIGNED_OUT_SELECTOR =
  ".app-user-menu__sign-in-input";

export const USER_MENU_SIGN_UP_VIEW_SELECTOR =
  ".app-user-menu__auth-view--sign-up";
export const USER_MENU_SIGN_UP_BTN_SELECTOR = ".app-user-menu__sign-up-submit";

export const USER_MENU_ACCOUNT_FIELD_SIGNED_IN_SELECTOR =
  ".app-user-menu__account-input";
export const USER_MENU_ACCOUNT_COPY_BTN_SELECTOR =
  ".app-user-menu__account-copy-btn";
export const USER_MENU_ACCOUNT_DOWNLOAD_BTN_SELECTOR =
  ".app-user-menu__account-download-btn";

export const USER_MENU_LOGOUT_BTN_SELECTOR = ".app-user-menu__logout-btn";

export const USER_MENU_STATUS_LOADING_SELECTOR =
  ".app-user-menu__status .user-menu-status--loading";
export const USER_MENU_STATUS_SUCCESS_SELECTOR =
  ".app-user-menu__status .user-menu-status--success";
export const USER_MENU_STATUS_ERROR_SELECTOR =
  ".app-user-menu__status .user-menu-status--error";
export const USER_MENU_STATUS_ICON_CIRCLE_SELECTOR =
  ".user-menu-status__icon-circle";
export const USER_MENU_STATUS_ICON_MARK_SELECTOR =
  ".user-menu-status__icon-mark";

export const USER_MENU_AUTH_VIEW_SIGN_IN = "sign-in";
export const USER_MENU_AUTH_VIEW_SIGN_UP = "sign-up";

// Shared state classes.
export const USER_MENU_HIDDEN_CLASS = "is-hidden";
export const USER_MENU_VIEW_ACTIVE_AUTH = "is-active";
export const USER_MENU_OPEN_CLASS = "is-open";
export const USER_MENU_PANEL_ACTIVE_CLASS = "is-active";
export const USER_MENU_BACKDROP_VISIBLE_CLASS = "is-backdrop-visible";
export const USER_MENU_BACKDROP_CLOSING_CLASS = "is-backdrop-closing";
export const USER_MENU_PANEL_MOUNTED_CLASS = "is-panel-mounted";
export const USER_MENU_PANEL_OPEN_CLASS = "is-panel-open";
export const USER_MENU_PANEL_CLOSING_CLASS = "is-panel-closing";

// Panel / account state classes.
export const USER_MENU_AUTH_SIGN_IN_CLASS = "is-sign-in";
export const USER_MENU_AUTH_SIGN_UP_CLASS = "is-sign-up";

// Panel open / close animation (timing matches motion.css tokens).
export const USER_MENU_BLUR_MS = 250;
export const USER_MENU_SLIDE_MS = 250;

// Account action button micro-animation.
export const USER_MENU_ACCOUNT_ACTION_SUCCESS_CLASS = "is-success-active";
export const USER_MENU_ACCOUNT_ACTION_SUCCESS_HOLD_MS = 1000;
export const USER_MENU_ACCOUNT_ACTION_FADE_MS = 250;

// Auth flow animation classes.
export const USER_MENU_AUTH_LOCKED_CLASS = "is-user-menu-auth-locked";
export const USER_MENU_AUTH_RUNNING_CLASS = "is-user-menu-auth-running";
export const USER_MENU_AUTH_FADE_CLASS = "is-user-menu-auth-fade";
export const USER_MENU_AUTH_CONTENT_HIDDEN_CLASS = "is-user-menu-auth-content-hidden";
export const USER_MENU_AUTH_RESTORE_FADE_CLASS = "is-user-menu-auth-restore-fade";
export const USER_MENU_AUTH_VISIBLE_CLASS = "is-user-menu-auth-visible";

// Card state classes (pure CSS transitions)
export const USER_MENU_AUTH_CARD_SIGNED_OUT_CLASS = "is-card-signed-out";
export const USER_MENU_AUTH_CARD_SIGNED_IN_CLASS = "is-card-signed-in";
export const USER_MENU_AUTH_CARD_PANEL_UP_CLASS = "is-card-panel-up";
export const USER_MENU_AUTH_CARD_PANEL_FULL_CLASS = "is-card-panel-full";
export const USER_MENU_AUTH_CARD_EXTENSION_CLASS = "is-card-extension";

export const USER_MENU_AUTH_DOTS_FADE_IN_CLASS = "is-user-menu-auth-dots-fade-in";
export const USER_MENU_AUTH_DOTS_RUN_CLASS = "is-user-menu-auth-dots-run";
export const USER_MENU_AUTH_DOTS_FADE_OUT_CLASS = "is-user-menu-auth-dots-fade-out";
export const USER_MENU_AUTH_RESULT_DRAW_CLASS = "is-user-menu-auth-result-draw";
export const USER_MENU_AUTH_RESULT_FADE_OUT_CLASS = "is-user-menu-auth-result-fade-out";

export const USER_MENU_AUTH_PHASE_CLASSES = [
  USER_MENU_AUTH_CARD_SIGNED_OUT_CLASS,
  USER_MENU_AUTH_CARD_SIGNED_IN_CLASS,
  USER_MENU_AUTH_CARD_PANEL_UP_CLASS,
  USER_MENU_AUTH_CARD_PANEL_FULL_CLASS,
  USER_MENU_AUTH_CARD_EXTENSION_CLASS,
];

// Auth flow animation timing (matches motion.css tokens).
export const USER_MENU_AUTH_FADE_MS = 250;
export const USER_MENU_AUTH_EXPAND_UP_MS = 250;
export const USER_MENU_AUTH_EXPAND_FULL_MS = 250;
export const USER_MENU_AUTH_EXPAND_EXTENSION_MS = 250;
export const USER_MENU_AUTH_DOTS_RUN_MS = 3000;
export const USER_MENU_AUTH_RESULT_DRAW_MS = 1000;
export const USER_MENU_AUTH_SHRINK_MS = 250;
export const USER_MENU_AUTH_BUFFER_MS = 50;

import {
  MANUAL_MENU_ACTIVE_CLASS,
  MANUAL_MENU_BACKDROP_SELECTOR,
  MANUAL_MENU_CLOSE_BTN_SELECTOR,
  MANUAL_MENU_OPEN_BTN_SELECTOR,
  MANUAL_MENU_OTP_INPUT_SELECTOR,
  MANUAL_MENU_OTP_TYPE_BTN_SELECTOR,
  MANUAL_MENU_OTP_TYPE_HOTP,
  MANUAL_MENU_OTP_TYPE_HOTP_CLASS,
  MANUAL_MENU_OTP_TYPE_TRACK_SELECTOR,
  MANUAL_MENU_PANEL_OPEN_CLASS,
  MANUAL_MENU_ROOT_SELECTOR,
} from "@/js/sections/overlays/manual-menu/manual-menu.const.js";
import { manualMenuClose, manualMenuOpen } from "@/js/sections/overlays/manual-menu/manual-menu.animations.js";

/** Initializes manual menu section behavior. */
function manualMenuInit() {
  const root = document.querySelector(MANUAL_MENU_ROOT_SELECTOR);
  const backdrop = document.querySelector(MANUAL_MENU_BACKDROP_SELECTOR);
  const closeButton = document.querySelector(MANUAL_MENU_CLOSE_BTN_SELECTOR);
  const openButtons = document.querySelectorAll(MANUAL_MENU_OPEN_BTN_SELECTOR);
  const typeTrack = document.querySelector(MANUAL_MENU_OTP_TYPE_TRACK_SELECTOR);
  const typeButtons = document.querySelectorAll(MANUAL_MENU_OTP_TYPE_BTN_SELECTOR);
  const typeInput = document.querySelector(MANUAL_MENU_OTP_INPUT_SELECTOR);

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedType = button.dataset.otpType;
      if (!selectedType) {
        return;
      }

      typeTrack?.classList.toggle(MANUAL_MENU_OTP_TYPE_HOTP_CLASS, selectedType === MANUAL_MENU_OTP_TYPE_HOTP);

      typeButtons.forEach((btn) => {
        btn.classList.toggle(MANUAL_MENU_ACTIVE_CLASS, btn === button);
      });

      if (typeInput) {
        typeInput.value = selectedType;
      }
    });
  });

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (root?.classList.contains(MANUAL_MENU_PANEL_OPEN_CLASS)) {
        void manualMenuClose();
        return;
      }

      void manualMenuOpen();
    });
  });

  closeButton?.addEventListener("click", () => {
    void manualMenuClose();
  });

  backdrop?.addEventListener("click", () => {
    void manualMenuClose();
  });

  root?.addEventListener("click", (event) => {
    if (event.target !== root) {
      return;
    }

    void manualMenuClose();
  });
}

export { manualMenuInit };
export { manualMenuClose, manualMenuOpen } from "@/js/sections/overlays/manual-menu/manual-menu.animations.js";

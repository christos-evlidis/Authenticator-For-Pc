import {
  MANUAL_MENU_ACTIVE_CLASS,
  MANUAL_MENU_BACKDROP_SELECTOR,
  MANUAL_MENU_CLOSE_BTN_SELECTOR,
  MANUAL_MENU_OPEN_BTN_SELECTOR,
  MANUAL_MENU_OTP_INPUT_SELECTOR,
  MANUAL_MENU_OTP_TYPE_BTN_SELECTOR,
  MANUAL_MENU_OTP_TYPE_HOTP,
  MANUAL_MENU_OTP_TYPE_HOTP_CLASS,
  MANUAL_MENU_OTP_TYPE_TOTP,
  MANUAL_MENU_OTP_TYPE_TRACK_SELECTOR,
  MANUAL_MENU_PANEL_OPEN_CLASS,
  MANUAL_MENU_ROOT_SELECTOR,
} from "@/js/sections/overlays/manual-menu/manual-menu.const.js";
import { manualMenuClose, manualMenuOpen } from "@/js/sections/overlays/manual-menu/manual-menu.animations.js";
import { codesActionAdd } from "@/js/sections/core/codes/codes.index.js";
import { vaultActionAddManual } from "@/js/services/vault/action/add/manual.js";


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

  const form = root?.querySelector(".app-manual-menu__form");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const typeValue = String(form.querySelector('[name="type"]')?.value ?? "").toLowerCase();
    const rawEmail = String(formData.get("email") ?? "").trim();
    const snapshot = {
      name: String(formData.get("name") ?? "").trim(),
      secret: String(formData.get("secret") ?? "").trim(),
      email: rawEmail || "placeholder@example.com",
      type: typeValue === "hotp" ? "hotp" : "totp",
    };



    const submitBtn = form.querySelector(".app-manual-menu__submit");
    if (submitBtn) {
      submitBtn.disabled = true;
    }

    try {
      const added = await vaultActionAddManual(snapshot);

      if (added) {
        form.reset();
        if (typeInput) {
          typeInput.value = MANUAL_MENU_OTP_TYPE_TOTP;
        }
        typeTrack?.classList.remove(MANUAL_MENU_OTP_TYPE_HOTP_CLASS);
        typeButtons.forEach((btn) => {
          btn.classList.toggle(MANUAL_MENU_ACTIVE_CLASS, btn.dataset.otpType === MANUAL_MENU_OTP_TYPE_TOTP);
        });

        await manualMenuClose();
        await codesActionAdd(added);
      }
    } catch (err) {
      console.error("Failed to add manual account:", err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
      }
    }

  });
}

export { manualMenuInit };

export { manualMenuClose, manualMenuOpen } from "@/js/sections/overlays/manual-menu/manual-menu.animations.js";

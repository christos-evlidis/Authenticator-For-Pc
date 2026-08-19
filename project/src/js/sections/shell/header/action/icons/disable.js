import { HEADER_BUTTON_SELECTOR } from "../../../../../const/const.header.js";
import { HEADER_DISABLED_CLASS } from "../../../../../const/const.header.js";
import { HEADER_ROOT_SELECTOR } from "../../../../../const/const.header.js";

function _headerActionIconsDisable() {
  const header = document.querySelector(HEADER_ROOT_SELECTOR);

  if (header) {
    header.classList.add(HEADER_DISABLED_CLASS);
  }

  document.querySelectorAll(HEADER_BUTTON_SELECTOR).forEach((button) => {
    button.disabled = true;
    button.setAttribute("aria-disabled", "true");
  });
}

export { _headerActionIconsDisable as headerActionIconsDisable };

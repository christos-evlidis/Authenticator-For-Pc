import { HEADER_BUTTON_SELECTOR } from "../../../../../const/const.header.js";
import { HEADER_DISABLED_CLASS } from "../../../../../const/const.header.js";
import { HEADER_ROOT_SELECTOR } from "../../../../../const/const.header.js";

function _headerActionIconsEnable() {
  const header = document.querySelector(HEADER_ROOT_SELECTOR);

  if (header) {
    header.classList.remove(HEADER_DISABLED_CLASS);
  }

  document.querySelectorAll(HEADER_BUTTON_SELECTOR).forEach((button) => {
    button.disabled = false;
    button.setAttribute("aria-disabled", "false");
  });
}

export { _headerActionIconsEnable as headerActionIconsEnable };

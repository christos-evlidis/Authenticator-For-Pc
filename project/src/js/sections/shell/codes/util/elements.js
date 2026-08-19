import { CODES_CARD_TEMPLATE_SELECTOR } from "../../../../const/const.codes.js";
import { CODES_LIST_SELECTOR } from "../../../../const/const.codes.js";

/** Returns list and card template elements. */
function _codesElementsGet() {
  return {
    list: document.querySelector(CODES_LIST_SELECTOR),
    template: document.querySelector(CODES_CARD_TEMPLATE_SELECTOR),
  };
}

export { _codesElementsGet as codesElementsGet };

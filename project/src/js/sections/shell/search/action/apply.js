import { searchActionReset } from "./reset.js";

import { SEARCH_HIDDEN_CLASS, SEARCH_ROOT_SELECTOR } from "../../../../const/const.search.js";

/** Shows or hides the search bar based on auth state. */
function _searchApply(isAuthVisible) {
  const search = document.querySelector(SEARCH_ROOT_SELECTOR);

  if (!search) {
    return;
  }

  if (!isAuthVisible) {
    searchActionReset();
    return;
  }

  search.classList.remove(SEARCH_HIDDEN_CLASS);
}

export { _searchApply as searchApply };

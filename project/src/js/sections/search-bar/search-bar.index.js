import { appStateGet } from "@/js/app/app.state.js";
import { SEARCH_HIDDEN_CLASS, SEARCH_ROOT_SELECTOR } from "@/js/const/const.search.js";

/** Initializes search bar visibility from current app state. */
function searchBarInit() {
  const { authState } = appStateGet();
  const searchBar = document.querySelector(SEARCH_ROOT_SELECTOR);

  if (authState) {
    searchBar?.classList.remove(SEARCH_HIDDEN_CLASS);
    return;
  }

  searchBar?.classList.add(SEARCH_HIDDEN_CLASS);
}

export { searchBarInit };

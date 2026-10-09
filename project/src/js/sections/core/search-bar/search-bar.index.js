import { appStateGet, appStateSubscribe } from "@/js/app/app.state.js";
import { SEARCH_HIDDEN_CLASS, SEARCH_ROOT_SELECTOR } from "@/js/sections/core/search-bar/search-bar.const.js";
import { searchBarFadeIn } from "@/js/sections/core/search-bar/search-bar.animations.js";

/** Updates search bar visibility from current app state. */
function searchBarRender(state = appStateGet()) {
  const searchBar = document.querySelector(SEARCH_ROOT_SELECTOR);

  if (state.authState) {
    void searchBarFadeIn();
    return;
  }

  searchBar?.classList.add(SEARCH_HIDDEN_CLASS);
}

/** Initializes search bar and subscribes to state changes. */
function searchBarInit() {
  searchBarRender();
  appStateSubscribe(searchBarRender);
}

export { searchBarInit, searchBarRender };
export { searchBarFadeIn } from "@/js/sections/core/search-bar/search-bar.animations.js";


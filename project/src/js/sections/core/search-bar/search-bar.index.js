import { appStateGet, appStateSubscribe } from "@/js/app/app.state.js";
import { SEARCH_HIDDEN_CLASS, SEARCH_ROOT_SELECTOR } from "@/js/sections/core/search-bar/search-bar.const.js";
import { searchBarFadeIn } from "@/js/sections/core/search-bar/search-bar.animations.js";
import { vaultStorageReadyGet } from "@/js/services/vault/storage/ready.js";
import { vaultRecordSanitizeList } from "@/js/services/vault/record/sanitize/list.js";

/** Updates search bar visibility based on auth state and whether accounts exist. */
async function searchBarRender(state = appStateGet()) {
  const searchBar = document.querySelector(SEARCH_ROOT_SELECTOR);

  if (!state.authState) {
    searchBar?.classList.add(SEARCH_HIDDEN_CLASS);
    return;
  }

  const accounts = vaultRecordSanitizeList(await vaultStorageReadyGet());
  if (accounts.length > 0) {
    void searchBarFadeIn();
  } else {
    searchBar?.classList.add(SEARCH_HIDDEN_CLASS);
  }
}


/** Initializes search bar and subscribes to state changes. */
function searchBarInit() {
  searchBarRender();
  appStateSubscribe(searchBarRender);
}

export { searchBarInit, searchBarRender };
export { searchBarFadeIn } from "@/js/sections/core/search-bar/search-bar.animations.js";


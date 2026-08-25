import { SEARCH_FADE_IN_CLASS, SEARCH_FADE_MS, SEARCH_HIDDEN_CLASS, SEARCH_ROOT_SELECTOR } from "@/js/const/const.search.js";

/** Fades the search bar into view. */
async function searchBarFadeIn() {
  const element = document.querySelector(SEARCH_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove(SEARCH_HIDDEN_CLASS);
  element.classList.add(SEARCH_FADE_IN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, SEARCH_FADE_MS));
  element.classList.remove(SEARCH_FADE_IN_CLASS);
}

export { searchBarFadeIn };

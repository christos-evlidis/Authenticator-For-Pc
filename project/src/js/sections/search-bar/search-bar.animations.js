import { SEARCH_ROOT_SELECTOR } from "@/js/const/const.search.js";

const SEARCH_BAR_FADE_IN_CLASS = "is-search-bar-fade-in";

function waitAnimationEnd(element) {
  return new Promise((resolve) => {
    const onEnd = (event) => {
      if (event.target !== element) {
        return;
      }
      element.removeEventListener("animationend", onEnd);
      resolve();
    };
    element.addEventListener("animationend", onEnd);
  });
}

/** Fades the search bar into view. */
async function searchBarFadeIn() {
  const element = document.querySelector(SEARCH_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove("is-hidden");
  element.classList.add(SEARCH_BAR_FADE_IN_CLASS);
  await waitAnimationEnd(element);
  element.classList.remove(SEARCH_BAR_FADE_IN_CLASS);
}

export { searchBarFadeIn };

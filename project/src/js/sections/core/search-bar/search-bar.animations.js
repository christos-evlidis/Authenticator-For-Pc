import {
  SEARCH_COLLAPSED_CLASS,
  SEARCH_COLLAPSING_CLASS,
  SEARCH_FADE_IN_CLASS,
  SEARCH_FADE_MS,
  SEARCH_FADE_OUT_CLASS,
  SEARCH_HIDDEN_CLASS,
  SEARCH_ROOT_SELECTOR,
} from "@/js/sections/core/search-bar/search-bar.const.js";

/** Fades the search bar into view. */
async function searchBarFadeIn() {
  const element = document.querySelector(SEARCH_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove(
    SEARCH_HIDDEN_CLASS,
    SEARCH_COLLAPSING_CLASS,
    SEARCH_COLLAPSED_CLASS,
    SEARCH_FADE_OUT_CLASS
  );
  element.classList.add(SEARCH_FADE_IN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, SEARCH_FADE_MS));
  element.classList.remove(SEARCH_FADE_IN_CLASS);
}

/**
 * Fades out the search bar without collapsing its layout space yet.
 */
async function searchBarFadeOut() {
  const element = document.querySelector(SEARCH_ROOT_SELECTOR);
  if (!element || element.classList.contains(SEARCH_HIDDEN_CLASS)) {
    return;
  }

  element.classList.remove(SEARCH_FADE_IN_CLASS);
  element.classList.add(SEARCH_FADE_OUT_CLASS);
  await new Promise((resolve) => setTimeout(resolve, SEARCH_FADE_MS));
}

/**
 * Smoothly collapses the search bar height/margin upwards, then marks it hidden.
 */
async function searchBarCollapse() {
  const element = document.querySelector(SEARCH_ROOT_SELECTOR);
  if (!element || element.classList.contains(SEARCH_HIDDEN_CLASS)) {
    return;
  }

  element.classList.remove(SEARCH_FADE_IN_CLASS, SEARCH_FADE_OUT_CLASS);
  element.classList.add(SEARCH_COLLAPSING_CLASS);

  await new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      element.removeEventListener("transitionend", onEnd);
      clearTimeout(fallbackId);
      resolve();
    };

    const fallbackId = setTimeout(finish, SEARCH_FADE_MS + 60);

    const onEnd = (event) => {
      if (event.target === element && (event.propertyName === "max-height" || event.propertyName === "min-height")) {
        finish();
      }
    };

    element.addEventListener("transitionend", onEnd);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.classList.add(SEARCH_COLLAPSED_CLASS);
      });
    });
  });

  element.classList.add(SEARCH_HIDDEN_CLASS);
  element.classList.remove(SEARCH_COLLAPSING_CLASS, SEARCH_COLLAPSED_CLASS);
}

/**
 * Smoothly expands the search bar height/margin downwards, shrinking the body to its normal size.
 */
async function searchBarExpand() {
  const element = document.querySelector(SEARCH_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  // Measure target height while offscreen/transparent
  element.classList.remove(SEARCH_HIDDEN_CLASS);
  element.classList.add(SEARCH_COLLAPSED_CLASS);
  element.classList.remove(SEARCH_COLLAPSING_CLASS, SEARCH_FADE_IN_CLASS, SEARCH_FADE_OUT_CLASS);
  
  // Force reflow with collapsed state
  void element.offsetHeight;

  element.classList.add(SEARCH_COLLAPSING_CLASS);

  await new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      element.removeEventListener("transitionend", onEnd);
      clearTimeout(fallbackId);
      resolve();
    };

    const fallbackId = setTimeout(finish, SEARCH_FADE_MS + 60);

    const onEnd = (event) => {
      if (event.target === element && (event.propertyName === "max-height" || event.propertyName === "min-height")) {
        finish();
      }
    };

    element.addEventListener("transitionend", onEnd);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.classList.remove(SEARCH_COLLAPSED_CLASS);
      });
    });
  });

  element.classList.remove(SEARCH_COLLAPSING_CLASS);
}

export { searchBarFadeIn, searchBarFadeOut, searchBarCollapse, searchBarExpand };

import { HEADER_FADE_IN_CLASS, HEADER_FADE_MS, HEADER_HIDDEN_CLASS, HEADER_ROOT_SELECTOR } from "@/js/const/const.header.js";

/** Fades the header into view. */
async function headerFadeIn() {
  const element = document.querySelector(HEADER_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove(HEADER_HIDDEN_CLASS);
  element.classList.add(HEADER_FADE_IN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, HEADER_FADE_MS));
  element.classList.remove(HEADER_FADE_IN_CLASS);
}

export { headerFadeIn };
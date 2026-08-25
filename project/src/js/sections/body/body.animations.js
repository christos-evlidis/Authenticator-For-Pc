import { BODY_FADE_IN_CLASS, BODY_FADE_MS, BODY_HIDDEN_CLASS, BODY_ROOT_SELECTOR } from "@/js/const/const.body.js";

/** Fades the body into view. */
async function bodyFadeIn() {
  const element = document.querySelector(BODY_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove(BODY_HIDDEN_CLASS);
  element.classList.add(BODY_FADE_IN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, BODY_FADE_MS));
  element.classList.remove(BODY_FADE_IN_CLASS);
}

export { bodyFadeIn };
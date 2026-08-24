import { HEADER_ROOT_SELECTOR } from "@/js/const/const.header.js";

const HEADER_FADE_IN_CLASS = "is-header-fade-in";

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

/** Fades the header into view. */
async function headerFadeIn() {
  const element = document.querySelector(HEADER_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove("is-hidden");
  element.classList.add(HEADER_FADE_IN_CLASS);
  await waitAnimationEnd(element);
  element.classList.remove(HEADER_FADE_IN_CLASS);
}

export { headerFadeIn };

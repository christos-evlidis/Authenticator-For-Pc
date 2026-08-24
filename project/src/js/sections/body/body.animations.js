import { BODY_ROOT_SELECTOR } from "@/js/const/const.body.js";

const BODY_FADE_IN_CLASS = "is-body-fade-in";

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

/** Fades the body into view. */
async function bodyFadeIn() {
  const element = document.querySelector(BODY_ROOT_SELECTOR);
  if (!element) {
    return;
  }

  element.classList.remove("is-hidden");
  element.classList.add(BODY_FADE_IN_CLASS);
  await waitAnimationEnd(element);
  element.classList.remove(BODY_FADE_IN_CLASS);
}

export { bodyFadeIn };

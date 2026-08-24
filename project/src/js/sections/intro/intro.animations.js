import {
  INTRO_BACKDROP_SELECTOR,
  INTRO_LOGO_SELECTOR,
} from "@/js/const/const.intro.js";

const INTRO_LOGO_BREATH_CLASS = "is-intro-logo-breath";
const INTRO_FADE_OUT_CLASS = "is-intro-fade-out";

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

async function playAnimation(element, className) {
  if (!element) {
    return;
  }

  element.classList.add(className);
  await waitAnimationEnd(element);
  element.classList.remove(className);
}

/** Plays the intro logo breath animation on the logo element. */
async function introLogoBreath(element = document.querySelector(INTRO_LOGO_SELECTOR)) {
  await playAnimation(element, INTRO_LOGO_BREATH_CLASS);
}

/** Plays the intro fade-out animation on backdrop or logo. */
async function introFadeOut(element) {
  await playAnimation(element, INTRO_FADE_OUT_CLASS);
}

export { introFadeOut, introLogoBreath };

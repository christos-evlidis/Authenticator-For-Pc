import {
  INTRO_BACKDROP_SELECTOR,
  INTRO_LOGO_SELECTOR,
  INTRO_ROOT_SELECTOR,
} from "@/js/const/const.intro.js";
import { introFadeOut, introLogoBreath } from "@/js/sections/intro/intro.animations.js";
import { headerFadeIn } from "@/js/sections/header/header.animations.js";
import { searchBarFadeIn } from "@/js/sections/search-bar/search-bar.animations.js";
import { bodyFadeIn } from "@/js/sections/body/body.animations.js";

/** Startup intro: breathe, fade out overlay, then fade in shell sections. */
async function introSequence() {
  const root = document.querySelector(INTRO_ROOT_SELECTOR);
  const backdrop = document.querySelector(INTRO_BACKDROP_SELECTOR);
  const logo = document.querySelector(INTRO_LOGO_SELECTOR);

  if (root) {
    root.classList.add("is-active");

    await introLogoBreath(logo);

    await Promise.all([
      introFadeOut(backdrop),
      introFadeOut(logo),
    ]);

    root.classList.add("is-done");
    root.remove();
  }

  await Promise.all([
    headerFadeIn(),
    searchBarFadeIn(),
    bodyFadeIn(),
  ]);
}

export { introSequence };

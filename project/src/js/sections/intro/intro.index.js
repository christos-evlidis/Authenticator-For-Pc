import { introSequence } from "@/js/motion/sequences/intro.js";

export { introFadeOut, introLogoBreath } from "@/js/sections/intro/intro.animations.js";

/** Runs the startup intro sequence. */
async function introInit() {
  await introSequence();
}

export { introInit };

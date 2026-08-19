import { THEME_DARK_CLASS, THEME_DARK_KEY, THEME_LIGHT_KEY } from "../../../const/const.theme.js";

/** Returns the theme active on the body layer. */
export function themeStateGet() {
  return document.body.classList.contains(THEME_DARK_CLASS) ? THEME_DARK_KEY : THEME_LIGHT_KEY;
}

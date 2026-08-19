import { THEME_DARK_KEY, THEME_LIGHT_KEY, THEME_WHITE_CLASS, THEME_DARK_CLASS, THEME_ICON_SIZES } from "../../../const/const.theme.js";

export function themeActionSet(theme) {
  const isDark = theme === THEME_DARK_KEY;

  document.body.classList.toggle(THEME_WHITE_CLASS, !isDark);
  document.body.classList.toggle(THEME_DARK_CLASS, isDark);

  if (typeof chrome !== "undefined" && chrome.action?.setIcon && chrome.runtime?.getURL) {
    const iconPaths = Object.fromEntries(
      THEME_ICON_SIZES.map((size) => [
        size,
        chrome.runtime.getURL(`icons/${theme === THEME_DARK_KEY ? "dark" : "light"}/icon${size}.png`),
      ]),
    );
    try {
      chrome.action.setIcon({ path: iconPaths });
    } catch {}
  }
}

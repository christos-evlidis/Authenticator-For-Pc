import { THEME_STORAGE_KEY } from "../../../const/const.theme.js";

export function themeStorageSet(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

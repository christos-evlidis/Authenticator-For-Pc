import { THEME_STORAGE_KEY } from "../../../const/const.theme.js";

export function themeStorageGet() {
  return localStorage.getItem(THEME_STORAGE_KEY);
}

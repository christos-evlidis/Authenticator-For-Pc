import { THEME_STORAGE_KEY } from "../../../const/const.theme.js";

export function themeStorageClear() {
  localStorage.removeItem(THEME_STORAGE_KEY);
}

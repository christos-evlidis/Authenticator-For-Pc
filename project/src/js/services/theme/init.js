import { THEME_LIGHT_KEY } from "../../const/const.theme.js";
import { themeActionApply } from "./action/apply.js";
import { themeStorageGet } from "./storage/get.js";

function themeInit() {
  const theme = themeStorageGet() || THEME_LIGHT_KEY;
  themeActionApply(theme, { instant: true });
}

export { themeInit };

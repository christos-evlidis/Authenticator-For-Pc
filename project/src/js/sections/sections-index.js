import { manualSetupInit } from "./overlay/manual-setup/manual-setup.index.js";
import { codesInit } from "./shell/codes/codes-index.js";
import { searchInit } from "./shell/search/search-index.js";
import { userMenuInit } from "./overlay/user-menu/user-menu.index.js";

function initSectionModules() {
  userMenuInit();
  codesInit();
  searchInit();
  manualSetupInit();
}

export { initSectionModules };

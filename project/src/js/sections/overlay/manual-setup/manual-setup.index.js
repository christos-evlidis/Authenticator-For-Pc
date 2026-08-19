import { manualSetupEventsBind } from "./manual-setup.events.js";
import { manualSetupDomGet } from "./manual-setup.dom.js";

function _manualSetupInit() {
  manualSetupEventsBind();
  const dom = manualSetupDomGet();
  if (dom.form) {
    const typeInput = dom.form.querySelector('[name="type"]');
    if (typeInput) {
      typeInput.value = "totp";
    }
    if (dom.typeTrack) {
      dom.typeTrack.classList.remove("is-hotp");
    }
    dom.typeBtns.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.otpType !== "hotp");
    });
  }
}

export { _manualSetupInit as manualSetupInit };

// Functions exported from this section:
// - manualSetupInit

// Functions used by other parts of the codebase:
// - manualSetupInit (used in project/src/js/sections/sections-index.js)

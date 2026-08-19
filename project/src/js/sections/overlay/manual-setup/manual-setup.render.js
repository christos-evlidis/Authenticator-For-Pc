import { manualSetupDomGet } from "./manual-setup.dom.js";

function _manualSetupRenderTypeSwitch(type) {
  const dom = manualSetupDomGet();
  if (dom.typeTrack) {
    dom.typeTrack.classList.toggle("is-hotp", type === "hotp");
  }
  dom.typeBtns.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.otpType === type);
  });
}

export { _manualSetupRenderTypeSwitch as manualSetupRenderTypeSwitch };

import { manualSetupDomGet } from "./manual-setup.dom.js";
import { manualSetupPanelOpen, manualSetupPanelClose } from "./action/manual-setup.panel.js";
import { manualSetupFormSubmit } from "./action/manual-setup.form.js";
import { manualSetupTypeSwitch } from "./action/manual-setup.type.js";

function _manualSetupEventsBind() {
  const dom = manualSetupDomGet();
  dom.openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      void manualSetupPanelOpen();
    });
  });
  dom.closeBtn?.addEventListener("click", () => {
    void manualSetupPanelClose();
  });
  dom.backdrop?.addEventListener("click", () => {
    void manualSetupPanelClose();
  });
  dom.panel?.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  dom.form?.addEventListener("submit", (event) => {
    void manualSetupFormSubmit(event);
  });
  dom.typeBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      manualSetupTypeSwitch(button.dataset.otpType);
    });
  });
}

export { _manualSetupEventsBind as manualSetupEventsBind };

import {
  MANUAL_SETUP_ROOT_SELECTOR,
  MANUAL_SETUP_BACKDROP_SELECTOR,
  MANUAL_SETUP_PANEL_SELECTOR,
  MANUAL_SETUP_HEADER_SELECTOR,
  MANUAL_SETUP_CONTENT_SELECTOR,
  MANUAL_SETUP_BODY_SELECTOR,
  MANUAL_SETUP_FORM_SELECTOR,
  MANUAL_SETUP_CLOSE_BTN_SELECTOR,
  MANUAL_SETUP_OPEN_BTN_SELECTOR,
  MANUAL_SETUP_OTP_TYPE_TRACK_SELECTOR,
  MANUAL_SETUP_OTP_TYPE_BTN_SELECTOR,
  MANUAL_SETUP_STATUS_LOADING_SELECTOR,
  MANUAL_SETUP_STATUS_SUCCESS_SELECTOR,
  MANUAL_SETUP_STATUS_ERROR_SELECTOR,
  MANUAL_SETUP_STATUS_ICON_CIRCLE_SELECTOR,
  MANUAL_SETUP_STATUS_ICON_MARK_SELECTOR,
} from "../../../const/const.manual-setup.js";

function _manualSetupDomQuery() {
  return {
    root: document.querySelector(MANUAL_SETUP_ROOT_SELECTOR),
    backdrop: document.querySelector(MANUAL_SETUP_BACKDROP_SELECTOR),
    panel: document.querySelector(MANUAL_SETUP_PANEL_SELECTOR),
    header: document.querySelector(MANUAL_SETUP_HEADER_SELECTOR),
    content: document.querySelector(MANUAL_SETUP_CONTENT_SELECTOR),
    body: document.querySelector(MANUAL_SETUP_BODY_SELECTOR),
    form: document.querySelector(MANUAL_SETUP_FORM_SELECTOR),
    closeBtn: document.querySelector(MANUAL_SETUP_CLOSE_BTN_SELECTOR),
    openBtns: [...document.querySelectorAll(MANUAL_SETUP_OPEN_BTN_SELECTOR)],
    typeTrack: document.querySelector(MANUAL_SETUP_OTP_TYPE_TRACK_SELECTOR),
    typeBtns: [...document.querySelectorAll(MANUAL_SETUP_OTP_TYPE_BTN_SELECTOR)],
    statusLoading: document.querySelector(MANUAL_SETUP_STATUS_LOADING_SELECTOR),
    statusSuccess: document.querySelector(MANUAL_SETUP_STATUS_SUCCESS_SELECTOR),
    statusError: document.querySelector(MANUAL_SETUP_STATUS_ERROR_SELECTOR),
    statusCircle: document.querySelector(MANUAL_SETUP_STATUS_ICON_CIRCLE_SELECTOR),
    statusMark: document.querySelector(MANUAL_SETUP_STATUS_ICON_MARK_SELECTOR),
  };
}

function _manualSetupDomGet() {
  return _manualSetupDomQuery();
}

function _manualSetupDomSet(next = {}) {
  const dom = _manualSetupDomQuery();
  return dom;
}

export { _manualSetupDomGet as manualSetupDomGet };
export { _manualSetupDomSet as manualSetupDomSet };

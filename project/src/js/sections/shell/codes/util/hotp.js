import { DATA_COUNTER_MIN, DATA_HOTP_COUNTER_DEFAULT } from "../../../../services/data/data-index.js";

/** Returns the numeric HOTP counter for an account. */
function _codesUtilHotpCounterValue(account) {
  return Number.isInteger(account?.counter) ? account.counter : DATA_HOTP_COUNTER_DEFAULT;
}

/** Returns HOTP counter text for display on a card. */
function _codesUtilHotpCounterDisplay(account) {
  return String(_codesUtilHotpCounterValue(account));
}

/** Parses user-entered HOTP counter text. */
function _codesUtilHotpCounterParse(text) {
  const trimmed = String(text ?? "").trim();

  if (!/^\d+$/.test(trimmed)) {
    return null;
  }

  const counter = Number.parseInt(trimmed, 10);

  if (!Number.isInteger(counter) || counter < DATA_COUNTER_MIN) {
    return null;
  }

  return counter;
}

export {
  _codesUtilHotpCounterDisplay as codesUtilHotpCounterDisplay,
  _codesUtilHotpCounterParse as codesUtilHotpCounterParse,
  _codesUtilHotpCounterValue as codesUtilHotpCounterValue,
};

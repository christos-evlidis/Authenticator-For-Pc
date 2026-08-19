import { dataRecordSanitizeName } from "../record/sanitize/name.js";
import { dataRecordSanitizeSecret } from "../record/sanitize/secret.js";

import { DATA_HOTP_COUNTER_DEFAULT, DATA_OTP_ALGORITHM_DEFAULT, DATA_OTP_DIGITS, DATA_OTP_PERIOD, DATA_OTP_TYPE_HOTP } from "../../../const/const.otp.js";

/** Parses an otpauth URI into a normalized account object. */
function dataParseQr(uri) {
  try {
    let raw = String(uri).trim();
    if (raw.toLowerCase().startsWith("apple-otpauth://")) {
      raw = `otpauth://${raw.slice("apple-otpauth://".length)}`;
    }
    const url = new URL(raw);
    const type = url.hostname.toLowerCase();
    const secret = dataRecordSanitizeSecret(url.searchParams.get("secret"));
    const digitsParam = url.searchParams.get("digits");
    const digits = digitsParam ? Number.parseInt(digitsParam, 10) : DATA_OTP_DIGITS;
    const algorithmParam = url.searchParams.get("algorithm");
    const algorithm = algorithmParam || DATA_OTP_ALGORITHM_DEFAULT;
    const otpOptions = { type, algorithm, digits };
    if (type === DATA_OTP_TYPE_HOTP) {
      const counterParam = url.searchParams.get("counter");
      otpOptions.counter = counterParam
        ? Number.parseInt(counterParam, 10)
        : DATA_HOTP_COUNTER_DEFAULT;
    } else {
      const periodParam = url.searchParams.get("period");
      otpOptions.period = periodParam
        ? Number.parseInt(periodParam, 10)
        : DATA_OTP_PERIOD;
    }
    const pathLabel = decodeURIComponent(url.pathname.replace(/^\//, ""));
    const colonIndex = pathLabel.indexOf(":");
    const pathIssuer =
      colonIndex !== -1 ? pathLabel.slice(0, colonIndex).trim() : "";
    const label =
      colonIndex !== -1 ? pathLabel.slice(colonIndex + 1).trim() : pathLabel;
    const issuerParam = url.searchParams.get("issuer");
    const issuer = issuerParam
      ? decodeURIComponent(issuerParam).trim()
      : pathIssuer;
    const { name, email } = dataRecordSanitizeName(issuer, label);
    const account = {
      name,
      secret,
      type,
      algorithm,
      digits,
    };
    if (type === DATA_OTP_TYPE_HOTP) {
      account.counter = otpOptions.counter;
    } else {
      account.period = otpOptions.period;
    }
    if (email) {
      account.email = email;
    }
    return account;
  } catch (error) {
    console.warn("[data-parser-qr] dataParseQr failed", error);
    throw error;
  }
}

export { dataParseQr };

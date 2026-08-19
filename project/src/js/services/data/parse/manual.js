import { dataRecordBuildIssuer } from "../record/build/issuer.js";
import { dataRecordSanitizeSecret } from "../record/sanitize/secret.js";

import { DATA_HOTP_COUNTER_DEFAULT, DATA_OTP_ALGORITHM_DEFAULT, DATA_OTP_DIGITS, DATA_OTP_PERIOD, DATA_OTP_TYPE_HOTP, DATA_OTP_TYPE_TOTP } from "../../../const/const.otp.js";

/** Parses manual form fields into a normalized account object. */
function dataParseManual({ name, secret, email, type }) {
  try {
    const sanitizedName = dataRecordBuildIssuer(name);
    const sanitizedSecret = dataRecordSanitizeSecret(secret);
    const otpType = type === DATA_OTP_TYPE_HOTP ? DATA_OTP_TYPE_HOTP : DATA_OTP_TYPE_TOTP;
    const otpOptions = {
      type: otpType,
      algorithm: DATA_OTP_ALGORITHM_DEFAULT,
      digits: DATA_OTP_DIGITS,
    };
    if (otpType === DATA_OTP_TYPE_HOTP) {
      otpOptions.counter = DATA_HOTP_COUNTER_DEFAULT;
    } else {
      otpOptions.period = DATA_OTP_PERIOD;
    }
    const emailRaw = String(email).trim();
    const account = {
      name: sanitizedName,
      secret: sanitizedSecret,
      type: otpType,
      algorithm: otpOptions.algorithm,
      digits: otpOptions.digits,
    };
    if (otpType === DATA_OTP_TYPE_HOTP) {
      account.counter = otpOptions.counter;
    } else {
      account.period = otpOptions.period;
    }
    if (emailRaw) {
      account.email = emailRaw;
    }
    return account;
  } catch (error) {
    console.warn("[data-parser-manual] dataParseManual failed", error);
    throw error;
  }
}

export { dataParseManual };

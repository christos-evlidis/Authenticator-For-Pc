import {
  DATA_HOTP_COUNTER_DEFAULT,
  DATA_OTP_ALGORITHM_DEFAULT,
  DATA_OTP_DIGITS,
  DATA_OTP_PERIOD,
  DATA_OTP_TYPE_HOTP,
  DATA_OTP_TYPE_TOTP,
} from "@/js/const/const.otp.js";

/** Builds OTP generation options from an account record with defaults. */
function otpUtilOptions(account) {
  try {
    const type = account.type ?? DATA_OTP_TYPE_TOTP;
    const options = {
      type,
      algorithm: account.algorithm ?? DATA_OTP_ALGORITHM_DEFAULT,
      digits: account.digits ?? DATA_OTP_DIGITS,
    };
    if (type === DATA_OTP_TYPE_HOTP) {
      options.counter = account.counter ?? DATA_HOTP_COUNTER_DEFAULT;
    } else {
      options.period = account.period ?? DATA_OTP_PERIOD;
    }
    return options;
  } catch {
    return null;
  }
}

export { otpUtilOptions };

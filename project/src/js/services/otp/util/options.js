import { DATA_OTP_TYPE_HOTP } from "@/js/const/const.otp.js";

/** Builds OTP generation options from an account record. */
function otpOptions(account) {
  try {
    const options = {
      type: account.type,
      algorithm: account.algorithm,
      digits: account.digits,
    };
    if (account.type === DATA_OTP_TYPE_HOTP) {
      options.counter = account.counter;
    } else {
      options.period = account.period;
    }
    return options;
  } catch {
    return null;
  }
}

export { otpOptions };

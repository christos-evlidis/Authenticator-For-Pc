import { DATA_OTP_TYPE_HOTP } from "../../../const/const.otp.js";

/** Builds OTP generation options from an account record. */
function dataCodeOptions(account) {
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
  } catch (error) {
    console.warn("[data-code] dataCodeOptions failed", error);
    throw error;
  }
}

export { dataCodeOptions };

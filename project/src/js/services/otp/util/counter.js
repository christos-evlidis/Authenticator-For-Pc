import { DATA_OTP_PERIOD, DATA_OTP_TYPE_HOTP } from "@/js/const/const.otp.js";

/** Returns the HOTP counter or TOTP time step for code generation. */
function otpUtilCounter(options) {
  try {
    if (options.type === DATA_OTP_TYPE_HOTP) {
      return options.counter;
    }
    const period = options.period;
    if (!period || period < 1) {
      return Math.floor(Date.now() / 1000 / DATA_OTP_PERIOD);
    }
    const epochSec = Math.floor(Date.now() / 1000);
    return Math.floor(epochSec / period);
  } catch {
    return 0;
  }
}

export { otpUtilCounter };

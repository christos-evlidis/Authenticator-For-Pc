import { DATA_OTP_TYPE_HOTP } from "@/js/const/const.otp.js";

/** Returns whether the account uses HOTP. */
function otpTypeHotp(account) {
  try {
    return account.type === DATA_OTP_TYPE_HOTP;
  } catch {
    return false;
  }
}

export { otpTypeHotp };

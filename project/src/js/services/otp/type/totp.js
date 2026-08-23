import { DATA_OTP_TYPE_TOTP } from "@/js/const/const.otp.js";

/** Returns whether the account uses TOTP. */
function otpTypeTotp(account) {
  try {
    return account.type === DATA_OTP_TYPE_TOTP;
  } catch {
    return false;
  }
}

export { otpTypeTotp };

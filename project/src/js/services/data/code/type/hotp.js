import { DATA_OTP_TYPE_HOTP } from "../../../../const/const.otp.js";

/** Returns whether the account uses HOTP. */
function dataCodeTypeHotp(account) {
  try {
    return account.type === DATA_OTP_TYPE_HOTP;
  } catch (error) {
    console.warn("[data-code] dataCodeTypeHotp failed", error);
    return false;
  }
}

export { dataCodeTypeHotp };

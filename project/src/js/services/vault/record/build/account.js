import { DATA_HOTP_COUNTER_DEFAULT, DATA_OTP_ALGORITHM_DEFAULT, DATA_OTP_DIGITS, DATA_OTP_PERIOD, DATA_OTP_TYPE_HOTP, DATA_OTP_TYPE_TOTP } from "@/js/const/const.otp.js";

/** Assigns ID and defaults to build an account record. */
function vaultRecordBuildAccount({
  name,
  secret,
  email,
  algorithm,
  digits,
  period,
  type,
  counter,
}) {
  try {
    const otpType = type ?? DATA_OTP_TYPE_TOTP;
    const account = {
      id: String(Date.now()),
      name,
      secret,
      type: otpType,
      algorithm: algorithm ?? DATA_OTP_ALGORITHM_DEFAULT,
      digits: digits ?? DATA_OTP_DIGITS,
    };
    if (otpType === DATA_OTP_TYPE_HOTP) {
      account.counter = counter ?? DATA_HOTP_COUNTER_DEFAULT;
    } else {
      account.period = period ?? DATA_OTP_PERIOD;
    }
    if (email) {
      account.email = email;
    }
    return account;
  } catch {
    return null;
  }
}

export { vaultRecordBuildAccount };

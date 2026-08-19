import CryptoJS from "crypto-js";
import { dataCodeCounter } from "./counter.js";
import { dataRecordSanitizeSecret } from "../record/sanitize/secret.js";

/** Generates an OTP code from a secret and options. */
function dataCodeGenerate(secret, options) {
  try {
    const sanitized = dataRecordSanitizeSecret(secret);
    const counterValue = dataCodeCounter(options);
    const hmacFn = {
      SHA1: CryptoJS.HmacSHA1,
      SHA256: CryptoJS.HmacSHA256,
      SHA512: CryptoJS.HmacSHA512,
    }[options.algorithm];
    if (!hmacFn) {
      console.warn(
        `[data-code] dataCodeGenerate: unsupported algorithm ${options.algorithm}`,
      );
      return "".padStart(options.digits, "0");
    }
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    const keyBytes = [];
    for (const char of sanitized) {
      const val = alphabet.indexOf(char);
      bits += val.toString(2).padStart(5, "0");
    }
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      keyBytes.push(parseInt(bits.substring(i, i + 8), 2));
    }
    let remaining = Math.floor(counterValue);
    const counterBytes = new Uint8Array(8);
    for (let i = 7; i >= 0; i--) {
      counterBytes[i] = remaining & 0xff;
      remaining = Math.floor(remaining / 256);
    }
    const counterWords = [];
    for (let i = 0; i < counterBytes.length; i += 4) {
      counterWords.push(
        (counterBytes[i] << 24) |
          (counterBytes[i + 1] << 16) |
          (counterBytes[i + 2] << 8) |
          counterBytes[i + 3],
      );
    }
    const keyU8 = new Uint8Array(keyBytes);
    const keyWords = [];
    for (let i = 0; i < keyU8.length; i += 4) {
      keyWords.push(
        (keyU8[i] << 24) |
          (keyU8[i + 1] << 16) |
          (keyU8[i + 2] << 8) |
          keyU8[i + 3],
      );
    }
    const hmac = hmacFn(
      CryptoJS.lib.WordArray.create(counterWords, counterBytes.length),
      CryptoJS.lib.WordArray.create(keyWords, keyU8.length),
    );
    const hmacBytes = hmac.words.reduce(
      (acc, word) =>
        acc.concat([
          (word >> 24) & 0xff,
          (word >> 16) & 0xff,
          (word >> 8) & 0xff,
          word & 0xff,
        ]),
      [],
    );
    const offset = hmacBytes[hmacBytes.length - 1] & 0x0f;
    const binary =
      ((hmacBytes[offset] & 0x7f) << 24) |
      (hmacBytes[offset + 1] << 16) |
      (hmacBytes[offset + 2] << 8) |
      hmacBytes[offset + 3];
    const otp = binary % 10 ** options.digits;
    return otp.toString().padStart(options.digits, "0");
  } catch (error) {
    console.warn("[data-code] dataCodeGenerate failed", error);
    return "".padStart(options?.digits ?? 6, "0");
  }
}

export { dataCodeGenerate };

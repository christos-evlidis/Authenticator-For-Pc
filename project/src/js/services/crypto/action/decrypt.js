import CryptoJS from "crypto-js";

/** Decrypts encrypted account data with the auth number key. */
function cryptoDecrypt(encryptedData, authNumber) {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, authNumber);
    const accountsJson = decrypted.toString(CryptoJS.enc.Utf8);
    if (!accountsJson) {
      return null;
    }
    return JSON.parse(accountsJson);
  } catch {
    return null;
  }
}

export { cryptoDecrypt };

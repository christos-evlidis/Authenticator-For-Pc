import CryptoJS from "crypto-js";

/** Encrypts account data as JSON with the auth number key. */
function cryptoEncrypt(accounts, authNumber) {
  try {
    const accountsJson = JSON.stringify(accounts);
    return CryptoJS.AES.encrypt(accountsJson, authNumber).toString();
  } catch {
    return null;
  }
}

export { cryptoEncrypt };

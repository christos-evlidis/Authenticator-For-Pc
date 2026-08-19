import CryptoJS from "crypto-js";

/** Encrypts account data as JSON with the auth number key. */
function dataCryptoEncrypt(accounts, authNumber) {
  try {
    const accountsJson = JSON.stringify(accounts);
    return CryptoJS.AES.encrypt(accountsJson, authNumber).toString();
  } catch (error) {
    console.warn("[data-crypto] encrypt failed", error);
    throw error;
  }
}

export { dataCryptoEncrypt };

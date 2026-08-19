/** Returns whether data looks like CryptoJS AES ciphertext. */
function dataCryptoTypeEncrypted(data) {
  try {
    return typeof data === "string" && data.startsWith("U2FsdGVkX1");
  } catch (error) {
    console.warn("[data-crypto] dataCryptoTypeEncrypted failed", error);
    return false;
  }
}

export { dataCryptoTypeEncrypted };

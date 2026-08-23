/** Returns whether data looks like CryptoJS AES ciphertext. */
function cryptoTypeEncrypted(data) {
  try {
    return typeof data === "string" && data.startsWith("U2FsdGVkX1");
  } catch {
    return null;
  }
}

export { cryptoTypeEncrypted };

/** Normalizes a Base32 secret string for OTP use. */
function vaultRecordSanitizeSecret(raw) {
  try {
    return String(raw)
      .trim()
      .replace(/\u+/g, "")
      .replace(/=+$/, "")
      .toUpperCase();
  } catch {
    return null;
  }
}

export { vaultRecordSanitizeSecret };

/** Normalizes a Base32 secret string for OTP use. */
function dataRecordSanitizeSecret(raw) {
  try {
    return String(raw)
      .trim()
      .replace(/\u+/g, "")
      .replace(/=+$/, "")
      .toUpperCase();
  } catch (error) {
    console.warn("[data-record] dataRecordSanitizeSecret failed", error);
    throw error;
  }
}

export { dataRecordSanitizeSecret };

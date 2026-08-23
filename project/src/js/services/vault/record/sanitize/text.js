/** Trims control characters and limits record text to 64 characters. */
function vaultRecordSanitizeText(text) {
  try {
    const trimmed = String(text)
      .trim()
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    return Array.from(trimmed).slice(0, 64).join("").trim();
  } catch {
    return "";
  }
}

export { vaultRecordSanitizeText };

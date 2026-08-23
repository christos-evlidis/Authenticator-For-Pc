import { vaultRecordSanitizeText } from "@/js/services/vault/record/sanitize/text.js";

/** Title-cases and sanitizes an issuer name string. */
function vaultRecordBuildIssuer(issuer) {
  try {
    const sanitized = vaultRecordSanitizeText(issuer);
    if (!sanitized) {
      return "";
    }
    return sanitized
      .split(/\u+/)
      .map((word) => {
        const chars = Array.from(word);
        if (!chars.length) {
          return "";
        }
        return (
          chars[0].toLocaleUpperCase() +
          chars.slice(1).join("").toLocaleLowerCase()
        );
      })
      .filter(Boolean)
      .join(" ");
  } catch {
    return "";
  }
}

export { vaultRecordBuildIssuer };

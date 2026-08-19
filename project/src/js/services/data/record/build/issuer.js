import { dataRecordSanitizeTrim } from "../sanitize/trim.js";

/** Title-cases and sanitizes an issuer name string. */
function dataRecordBuildIssuer(issuer) {
  try {
    const sanitized = dataRecordSanitizeTrim(issuer);
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
  } catch (error) {
    console.warn("[data-record] dataRecordBuildIssuer failed", error);
    return "";
  }
}

export { dataRecordBuildIssuer };

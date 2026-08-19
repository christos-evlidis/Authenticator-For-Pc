/** Trims and limits account name text to 64 characters. */
function dataRecordSanitizeTrim(name) {
  try {
    const trimmed = String(name)
      .trim()
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    return Array.from(trimmed).slice(0, 64).join("").trim();
  } catch (error) {
    console.warn("[data-record] dataRecordSanitizeTrim failed", error);
    return "";
  }
}

export { dataRecordSanitizeTrim };

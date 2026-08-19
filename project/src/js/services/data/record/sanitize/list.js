/** Normalizes varied storage shapes into an account array. */
function dataRecordSanitizeList(value) {
  try {
    if (value == null) {
      return [];
    }
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "object") {
      if (Array.isArray(value.accounts)) {
        return value.accounts;
      }
      if (Array.isArray(value.data)) {
        return value.data;
      }
      if (value.data != null && Array.isArray(value.data.accounts)) {
        return value.data.accounts;
      }
      if (value.id != null) {
        return [value];
      }
    }
    return [];
  } catch (error) {
    console.warn("[data-record] dataRecordSanitizeList failed", error);
    return [];
  }
}

export { dataRecordSanitizeList };

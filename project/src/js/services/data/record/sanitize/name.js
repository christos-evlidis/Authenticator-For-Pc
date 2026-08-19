import { dataRecordBuildIssuer } from "../build/issuer.js";
import { dataRecordSanitizeTrim } from "./trim.js";

/** Derives display name and email from issuer and label. */
function dataRecordSanitizeName(issuer, label) {
  try {
    const issuerText = dataRecordBuildIssuer(issuer);
    const labelText = dataRecordSanitizeTrim(label);
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let name = issuerText;
    let email = "";
    if (labelText) {
      if (emailPattern.test(labelText)) {
        email = labelText;
        name = issuerText || labelText.split("@")[0];
      } else if (issuerText) {
        name = `${issuerText} (${labelText})`;
      } else {
        name = labelText;
      }
    }
    name = dataRecordSanitizeTrim(name);
    return { name, email };
  } catch (error) {
    console.warn("[data-record] dataRecordSanitizeName failed", error);
    throw error;
  }
}

export { dataRecordSanitizeName };

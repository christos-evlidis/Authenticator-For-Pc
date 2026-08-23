import { vaultRecordBuildIssuer } from "@/js/services/vault/record/build/issuer.js";
import { vaultRecordSanitizeText } from "@/js/services/vault/record/sanitize/text.js";

/** Derives display name and email from issuer and label. */
function vaultRecordSanitizeName(issuer, label) {
  try {
    const issuerText = vaultRecordBuildIssuer(issuer);
    const labelText = vaultRecordSanitizeText(label);
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
    name = vaultRecordSanitizeText(name);
    return { name, email };
  } catch {
    return null;
  }
}

export { vaultRecordSanitizeName };

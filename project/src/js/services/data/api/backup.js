import { AUTH_API_BASE_URL } from "../../../const/const.auth.js";

/** Sends encrypted accounts to the remote backup API. */
async function dataApiBackup(authNumber, encryptedAccounts) {
  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/backup-accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_number: authNumber,
        accounts: encryptedAccounts,
        encrypted: true,
      }),
    });

    if (!response.ok) {
      console.warn(
        `[data-api] dataApiBackup HTTP ${response.status}`,
        response.statusText,
      );
    }

    return response.json();
  } catch (error) {
    console.warn("[data-api] dataApiBackup failed", error);
    throw error;
  }
}

export { dataApiBackup };

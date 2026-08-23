import { AUTH_API_BASE_URL } from "@/js/const/const.auth.js";

/** Sends encrypted vault payload to the remote backup API. */
async function remoteBackup(authNumber, encryptedAccounts) {
  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/vault`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authNumber}`,
      },
      body: JSON.stringify({ payload: encryptedAccounts }),
    });

    return response.json();
  } catch {
    return null;
  }
}

export { remoteBackup };

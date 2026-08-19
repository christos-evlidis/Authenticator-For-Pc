import { AUTH_API_BASE_URL } from "../../../const/const.auth.js";

/** Fetches account backup from the remote restore API. */
async function dataApiRestore(authNumber) {
  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/restore-accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_number: authNumber }),
    });

    if (!response.ok) {
      console.warn(
        `[data-api] dataApiRestore HTTP ${response.status}`,
        response.statusText,
      );
    }

    const data = await response.json();
    if (data?.success === false && data?.error === "No backup found") {
      return { accounts: null };
    }
    if (!response.ok) {
      throw new Error(`dataApiRestore HTTP ${response.status}`);
    }
    return { accounts: data.accounts };
  } catch (error) {
    console.warn("[data-api] dataApiRestore failed", error);
    throw error;
  }
}

export { dataApiRestore };

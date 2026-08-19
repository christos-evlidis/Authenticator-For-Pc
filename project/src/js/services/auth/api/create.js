import { AUTH_API_BASE_URL } from "../../../const/const.auth.js";

/** Creates a new account via the auth API and returns the account number. */
async function authApiCreate() {
  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/create-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.warn(
        `[auth-api] authApiCreate HTTP ${response.status}`,
        response.statusText,
      );
      throw new Error(`authApiCreate HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("[auth-api] authApiCreate failed", error);
    throw error;
  }
}

export { authApiCreate };

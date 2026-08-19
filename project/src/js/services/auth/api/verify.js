import { AUTH_API_BASE_URL } from "../../../const/const.auth.js";

/** Verifies an account number with the auth API. */
async function authApiVerify(authNumber) {
  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/verify-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_number: authNumber }),
    });
    if (!response.ok) {
      console.warn(
        `[auth-api] authApiVerify HTTP ${response.status}`,
        response.statusText,
      );
      return false;
    }
    const data = await response.json();
    return data?.success === true;
  } catch (error) {
    console.warn("[auth-api] authApiVerify failed", error);
    return false;
  }
}

export { authApiVerify };

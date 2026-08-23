import { AUTH_API_BASE_URL } from "@/js/const/const.auth.js";

/** Verifies an auth key with the auth API. */
async function accountApiVerify(authNumber) {
  try {
    const response = await fetch(
      `${AUTH_API_BASE_URL}/auth/sessions?auth_key=${encodeURIComponent(authNumber)}`,
      { method: "GET" },
    );
    const data = await response.json();
    if (!response.ok || data?.ok !== true) {
      return false;
    }
    return data?.data?.valid === true;
  } catch {
    return null;
  }
}

export { accountApiVerify };

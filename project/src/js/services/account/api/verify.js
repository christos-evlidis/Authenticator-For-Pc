import { AUTH_API_BASE_URL, AUTH_NUMBER_LENGTH } from "@/js/const/const.auth.js";

/**
 * Verifies an auth key with the auth API.
 * Returns true when valid, false when invalid, and null on network or server errors.
 */
async function accountApiVerify(authNumber) {
  if (
    !authNumber ||
    typeof authNumber !== "string" ||
    authNumber.length !== AUTH_NUMBER_LENGTH ||
    !/^\d+$/.test(authNumber)
  ) {
    return false;
  }

  try {
    const response = await fetch(
      `${AUTH_API_BASE_URL}/auth/sessions?auth_key=${encodeURIComponent(authNumber)}`,
      { method: "GET" },
    );

    let data;
    try {
      data = await response.json();
    } catch {
      return null;
    }

    if (response.ok && data?.ok === true && data?.data?.valid === true) {
      return true;
    }

    if (response.status === 401) {
      return false;
    }

    if (response.status === 400) {
      const errorCode = data?.error?.code;

      if (errorCode === "AUTH_KEY_INVALID" || errorCode === "AUTH_KEY_REQUIRED") {
        return false;
      }
    }

    if (response.status === 429) {
      return null;
    }

    if (response.status >= 500) {
      return null;
    }

    return null;
  } catch {
    return null;
  }
}

export { accountApiVerify };

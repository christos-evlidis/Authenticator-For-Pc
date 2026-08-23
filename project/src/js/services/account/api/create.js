import { AUTH_API_BASE_URL } from "@/js/const/const.auth.js";

/** Creates a new session via the auth API and returns the auth key. */
async function accountApiCreate() {
  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/auth/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok || data?.ok !== true) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export { accountApiCreate };

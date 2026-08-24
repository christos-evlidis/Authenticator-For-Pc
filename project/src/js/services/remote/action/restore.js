import { AUTH_API_BASE_URL } from "@/js/const/const.auth.js";

/** Fetches vault backup from the remote restore API. */
async function remoteActionRestore(authNumber) {
  try {
    const response = await fetch(`${AUTH_API_BASE_URL}/vault`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authNumber}`,
      },
    });

    const data = await response.json();
    if (!response.ok || data?.ok !== true) {
      return null;
    }

    const payload = data?.data?.payload;
    if (payload == null) {
      return { accounts: null };
    }

    return { accounts: payload };
  } catch {
    return null;
  }
}

export { remoteActionRestore };

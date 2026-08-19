/** In-memory store for application auth state and account key. */
const appStateStore = {
  stateAuth: false,
  authKey: null,
};

/** Returns the current application state snapshot. */
function appStateGet() {
  return {
    stateAuth: appStateStore.stateAuth, // Whether the user is authenticated.
    authKey: appStateStore.authKey, // The active account key, if any.
  };
}

/** Updates the application state with the provided values. */
function appStateSet(next) {
  if (typeof next.stateAuth === "boolean") { // Update auth state when provided.
    appStateStore.stateAuth = next.stateAuth; // Store whether the user is authenticated.
  }
  if (typeof next.authKey === "string") { // Update auth key when provided.
    appStateStore.authKey = next.authKey; // Store the active account key.
  }
}


export { appStateGet, appStateSet };

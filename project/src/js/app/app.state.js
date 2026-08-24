/** In-memory store for application auth state and account key. */
const appStateStore = {
  authState: false,
  authKey: null,
};

/** Returns the current application state snapshot. */
function appStateGet() {
  return {
    authState: appStateStore.authState,
    authKey: appStateStore.authKey,
  };
}

/** Updates the application state with the provided values. */
function appStateSet(value) {
  if (value.authKey === null) {
    appStateStore.authKey = null;
  }

  if (typeof value.authState === "boolean") {
    appStateStore.authState = value.authState;
  }

  if (typeof value.authKey === "string") {
    appStateStore.authKey = value.authKey;
  }
}

export { appStateGet, appStateSet };

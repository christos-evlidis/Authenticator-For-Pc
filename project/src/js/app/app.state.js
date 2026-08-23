/** In-memory store for application auth state and account key. */
const appStateStore = {
  stateAuth: false,
  authKey: null,
};

/** Returns the current application state snapshot. */
function appStateGet() {
  return {
    stateAuth: appStateStore.stateAuth, 
    authKey: appStateStore.authKey,
  };
}

/** Updates the application state with the provided values. */
function appStateSet(next) {
  if (typeof next.stateAuth === "boolean") {
    appStateStore.stateAuth = next.stateAuth;
  }
  if ("authKey" in next) {
    appStateStore.authKey = next.authKey;
  }
}


export { appStateGet, appStateSet };

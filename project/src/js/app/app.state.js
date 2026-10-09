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

/** Set of listener callbacks notified when app state changes. */
const appStateListeners = new Set();

/** Updates the application state with the provided values. */
function appStateSet(value) {
  let changed = false;

  if (value.authKey === null && appStateStore.authKey !== null) {
    appStateStore.authKey = null;
    changed = true;
  }

  if (typeof value.authState === "boolean" && appStateStore.authState !== value.authState) {
    appStateStore.authState = value.authState;
    changed = true;
  }

  if (typeof value.authKey === "string" && appStateStore.authKey !== value.authKey) {
    appStateStore.authKey = value.authKey;
    changed = true;
  }

  if (changed) {
    const snapshot = appStateGet();
    appStateListeners.forEach((listener) => {
      try {
        listener(snapshot);
      } catch (error) {
        console.error("Error in appState listener:", error);
      }
    });
  }
}

/** Subscribes a listener to application state changes. Returns an unsubscribe function. */
function appStateSubscribe(listener) {
  appStateListeners.add(listener);
  return () => {
    appStateListeners.delete(listener);
  };
}

export { appStateGet, appStateSet, appStateSubscribe };

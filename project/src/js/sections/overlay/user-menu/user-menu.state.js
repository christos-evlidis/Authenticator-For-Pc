/** In-memory store for user-menu panel, auth, animation, and run-ID state. */
const _userMenuStateStore = {
  statePanel: false,
  stateAuth: false,
  stateAnim: false,
  runIds: { panel: 0, signIn: 0, signUp: 0, signOut: 0, copy: 0, download: 0 },
};

function _userMenuStateGet() {
  return {
    statePanel: _userMenuStateStore.statePanel,
    stateAuth: _userMenuStateStore.stateAuth,
    stateAnim: _userMenuStateStore.stateAnim,
  };
}

function _userMenuStateSet(next) {
  if (typeof next.statePanel === "boolean") {
    _userMenuStateStore.statePanel = next.statePanel;
  }
  if (typeof next.stateAuth === "boolean") {
    _userMenuStateStore.stateAuth = next.stateAuth;
  }
  if (typeof next.stateAnim === "boolean") {
    _userMenuStateStore.stateAnim = next.stateAnim;
  }
}

function _userMenuStateRunIdNext(key) {
  _userMenuStateStore.runIds[key] += 1;
  return _userMenuStateStore.runIds[key];
}

function _userMenuStateRunIdGet(key) {
  return _userMenuStateStore.runIds[key];
}

export {
  _userMenuStateGet as userMenuStateGet,
  _userMenuStateRunIdGet as userMenuStateRunIdGet,
  _userMenuStateRunIdNext as userMenuStateRunIdNext,
  _userMenuStateSet as userMenuStateSet,
};

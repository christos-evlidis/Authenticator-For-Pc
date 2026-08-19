const _manualSetupStateStore = {
  isOpen: false,
  isSubmitting: false,
  runIds: { panel: 0, submit: 0 },
};

function _manualSetupStateGet() {
  return {
    isOpen: _manualSetupStateStore.isOpen,
    isSubmitting: _manualSetupStateStore.isSubmitting,
  };
}

function _manualSetupStateSet(next) {
  if (typeof next.isOpen === "boolean") {
    _manualSetupStateStore.isOpen = next.isOpen;
  }
  if (typeof next.isSubmitting === "boolean") {
    _manualSetupStateStore.isSubmitting = next.isSubmitting;
  }
}

function _manualSetupStateRunIdNext(key) {
  _manualSetupStateStore.runIds[key] += 1;
  return _manualSetupStateStore.runIds[key];
}

function _manualSetupStateRunIdGet(key) {
  return _manualSetupStateStore.runIds[key];
}

export { _manualSetupStateGet as manualSetupStateGet };
export { _manualSetupStateRunIdGet as manualSetupStateRunIdGet };
export { _manualSetupStateRunIdNext as manualSetupStateRunIdNext };
export { _manualSetupStateSet as manualSetupStateSet };

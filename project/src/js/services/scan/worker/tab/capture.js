/** Captures the visible tab in a window as a PNG data URL. */
function workerTabCapture(windowId) {
  return new Promise((resolve) => {
    chrome.tabs.captureVisibleTab(windowId ?? null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.warn(
          "[scan-tab] workerTabCapture failed",
          chrome.runtime.lastError,
        );
        resolve(undefined);
        return;
      }

      resolve(dataUrl);
    });
  });
}

export { workerTabCapture };

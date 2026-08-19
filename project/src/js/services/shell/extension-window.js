const EXTENSION_PAGE_PATH = "html/index.html";
const EXTENSION_WINDOW_WIDTH = 350;
const EXTENSION_WINDOW_HEIGHT = 600;

let extensionWindowId = null;

function extensionWindowPageUrlGet() {
  return chrome.runtime.getURL(EXTENSION_PAGE_PATH);
}

async function extensionWindowFind() {
  const pageUrl = extensionWindowPageUrlGet();
  const windows = await chrome.windows.getAll({
    populate: true,
    windowTypes: ["popup", "normal"],
  });

  return (
    windows.find((window) =>
      window.tabs?.some((tab) => tab.url === pageUrl),
    ) ?? null
  );
}

async function extensionWindowOpen() {
  try {
    if (typeof chrome.action.openPopup === "function") {
      try {
        await chrome.action.openPopup();
        return null;
      } catch (error) {
        console.warn("[extension-window] chrome.action.openPopup failed", error);
      }
    }

    const existing = await extensionWindowFind();

    if (existing?.id != null) {
      extensionWindowId = existing.id;
      await chrome.windows.update(existing.id, { focused: true });
      return existing;
    }

    const window = await chrome.windows.create({
      url: extensionWindowPageUrlGet(),
      type: "popup",
      width: EXTENSION_WINDOW_WIDTH,
      height: EXTENSION_WINDOW_HEIGHT,
      focused: true,
    });
    extensionWindowId = window.id ?? null;
    return window;
  } catch (error) {
    console.warn("[extension-window] extensionWindowOpen failed", error);
    throw error;
  }
}

function extensionWindowInit() {
  chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === extensionWindowId) {
      extensionWindowId = null;
    }
  });
}

export { extensionWindowInit, extensionWindowOpen };

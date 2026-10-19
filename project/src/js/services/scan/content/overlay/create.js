import {
  OVERLAY_CLASS,
  OVERLAY_CSS_PATH,
  OVERLAY_HOST_CLASS,
  OVERLAY_HOST_STYLE_ID,
  OVERLAY_INSTRUCTION_CLASS,
  OVERLAY_INSTRUCTION_TEXT,
  OVERLAY_SELECTION_CLASS,
} from "../../../../const/const.scan.js";

/** Creates and mounts the QR scan overlay in the page DOM. */
function contentOverlayCreate() {
  if (!document.getElementById(OVERLAY_HOST_STYLE_ID)) {
    const link = document.createElement("link");
    link.id = OVERLAY_HOST_STYLE_ID;
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL(OVERLAY_CSS_PATH);
    document.head.append(link);
  }

  const bodyStyle = getComputedStyle(document.body);
  const mountParent =
    bodyStyle.transform !== "none" ||
    bodyStyle.filter !== "none" ||
    bodyStyle.perspective !== "none" ||
    bodyStyle.isolation === "isolate" ||
    bodyStyle.willChange.includes("transform") ||
    bodyStyle.willChange.includes("filter")
      ? document.documentElement
      : document.body;

  const host = document.createElement("div");
  host.className = OVERLAY_HOST_CLASS;

  const shadow = host.attachShadow({ mode: "closed" });
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = chrome.runtime.getURL(OVERLAY_CSS_PATH);
  shadow.append(stylesheet);

  const overlay = document.createElement("div");
  overlay.className = OVERLAY_CLASS;

  const selectionBox = document.createElement("div");
  selectionBox.className = OVERLAY_SELECTION_CLASS;

  const instruction = document.createElement("div");
  instruction.className = OVERLAY_INSTRUCTION_CLASS;
  instruction.textContent = OVERLAY_INSTRUCTION_TEXT;

  overlay.append(selectionBox, instruction);
  shadow.append(overlay);
  mountParent.append(host);

  return { host, shadow, overlay, selectionBox };
}

export { contentOverlayCreate };

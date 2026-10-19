import { contentOverlayCreate } from "./create.js";
import { contentOverlayRemove } from "./remove.js";
import { contentOverlayStateStore } from "./state/store.js";

import { contentScreenshotCapture } from "../screenshot/capture.js";
import { MESSAGES, OVERLAY_DIMMED_CLASS, OVERLAY_SELECTING_CLASS, UNSUPPORTED_PAGE_ERROR } from "../../../../const/const.scan.js";

const SCAN_SEL_LEFT_VAR = "--scan-sel-left";
const SCAN_SEL_TOP_VAR = "--scan-sel-top";
const SCAN_SEL_WIDTH_VAR = "--scan-sel-width";
const SCAN_SEL_HEIGHT_VAR = "--scan-sel-height";
const SCAN_CLIP_PATH_VAR = "--scan-clip-path";

/** Starts the QR scan overlay and handles selection pointer events. */
function contentOverlayStart() {
  contentOverlayRemove();

  const { overlay, selectionBox } = contentOverlayCreate();
  let startX = 0;
  let startY = 0;
  let isSelecting = false;

  /** Cancels the overlay and notifies the service worker. */
  const onCancel = () => contentOverlayRemove({ notifyCancel: true });

  /** Captures the selected region and sends it for QR decoding. */
  const onComplete = async (selection) => {
    try {
      const cropped = await contentScreenshotCapture(selection);

      await chrome.runtime.sendMessage({
        action: MESSAGES.SCAN_QR_CODE,
        imageData: cropped.imageData,
        width: cropped.width,
        height: cropped.height,
      });
    } catch (error) {
      console.warn("[scan-content] contentOverlayStart capture failed", error);

      const message =
        error instanceof Error ? error.message : UNSUPPORTED_PAGE_ERROR;

      await chrome.runtime.sendMessage({
        action: MESSAGES.SCAN_QR_CODE,
        error: message,
      });
    }

    contentOverlayRemove();
  };

  /** Begins a drag selection on pointer down. */
  const onPointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    isSelecting = true;
    startX = event.clientX;
    startY = event.clientY;

    selectionBox.classList.add(OVERLAY_SELECTING_CLASS);
    selectionBox.style.setProperty(SCAN_SEL_LEFT_VAR, `${startX}px`);
    selectionBox.style.setProperty(SCAN_SEL_TOP_VAR, `${startY}px`);
    selectionBox.style.setProperty(SCAN_SEL_WIDTH_VAR, "0px");
    selectionBox.style.setProperty(SCAN_SEL_HEIGHT_VAR, "0px");
    overlay.classList.remove(OVERLAY_DIMMED_CLASS);
    overlay.style.removeProperty(SCAN_CLIP_PATH_VAR);
    overlay.setPointerCapture(event.pointerId);
  };

  /** Updates the selection box and dimmed clip path while dragging. */
  const onPointerMove = (event) => {
    if (!isSelecting) {
      return;
    }

    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const width = cursorX - startX;
    const height = cursorY - startY;
    const absWidth = Math.abs(width);
    const absHeight = Math.abs(height);
    const left = width < 0 ? cursorX : startX;
    const top = height < 0 ? cursorY : startY;

    selectionBox.style.setProperty(SCAN_SEL_LEFT_VAR, `${left}px`);
    selectionBox.style.setProperty(SCAN_SEL_TOP_VAR, `${top}px`);
    selectionBox.style.setProperty(SCAN_SEL_WIDTH_VAR, `${absWidth}px`);
    selectionBox.style.setProperty(SCAN_SEL_HEIGHT_VAR, `${absHeight}px`);

    if (absWidth <= 0 || absHeight <= 0) {
      overlay.classList.remove(OVERLAY_DIMMED_CLASS);
      overlay.style.removeProperty(SCAN_CLIP_PATH_VAR);
      return;
    }

    const right = left + absWidth;
    const bottom = top + absHeight;
    const clipPath = `polygon(0% 0%, 0% 100%, ${left}px 100%, ${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px, ${left}px 100%, 100% 100%, 100% 0%)`;

    overlay.classList.add(OVERLAY_DIMMED_CLASS);
    overlay.style.setProperty(SCAN_CLIP_PATH_VAR, clipPath);
  };

  /** Finishes the selection and triggers capture on pointer up. */
  const onPointerUp = async (event) => {
    if (!isSelecting) {
      return;
    }

    isSelecting = false;

    if (overlay.hasPointerCapture(event.pointerId)) {
      overlay.releasePointerCapture(event.pointerId);
    }

    const endX = event.clientX;
    const endY = event.clientY;
    const width = endX - startX;
    const height = endY - startY;

    await onComplete({
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: Math.abs(width),
      height: Math.abs(height),
    });
  };

  /** Cancels the overlay when the user presses Escape. */
  const onKeyDown = (event) => {
    if (event.key !== "Escape") {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    onCancel();
  };

  overlay.addEventListener("pointerdown", onPointerDown);
  overlay.addEventListener("pointermove", onPointerMove);
  overlay.addEventListener("pointerup", onPointerUp);
  overlay.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("keydown", onKeyDown, true);

  /** Removes overlay event listeners and dynamic selection styles. */
  contentOverlayStateStore.teardown = () => {
    overlay.removeEventListener("pointerdown", onPointerDown);
    overlay.removeEventListener("pointermove", onPointerMove);
    overlay.removeEventListener("pointerup", onPointerUp);
    overlay.removeEventListener("pointercancel", onPointerUp);
    window.removeEventListener("keydown", onKeyDown, true);
    selectionBox.classList.remove(OVERLAY_SELECTING_CLASS);
    selectionBox.style.removeProperty(SCAN_SEL_LEFT_VAR);
    selectionBox.style.removeProperty(SCAN_SEL_TOP_VAR);
    selectionBox.style.removeProperty(SCAN_SEL_WIDTH_VAR);
    selectionBox.style.removeProperty(SCAN_SEL_HEIGHT_VAR);
    overlay.classList.remove(OVERLAY_DIMMED_CLASS);
    overlay.style.removeProperty(SCAN_CLIP_PATH_VAR);
  };
}

export { contentOverlayStart };

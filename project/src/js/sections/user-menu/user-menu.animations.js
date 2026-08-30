import { USER_MENU_ANIMATION_CONTAINER_SELECTOR, USER_MENU_AUTH_ABSOLUTE_CLASS, USER_MENU_AUTH_BUFFER_MS, USER_MENU_AUTH_DOTS_FADE_IN_CLASS, USER_MENU_AUTH_DOTS_FADE_OUT_CLASS, USER_MENU_AUTH_DOTS_RUN_CLASS, USER_MENU_AUTH_DOTS_RUN_MS, USER_MENU_AUTH_EXPAND_EXTENSION_CLASS, USER_MENU_AUTH_EXPAND_EXTENSION_MS, USER_MENU_AUTH_EXPAND_FULL_CLASS, USER_MENU_AUTH_EXPAND_FULL_MS, USER_MENU_AUTH_EXPAND_UP_CLASS, USER_MENU_AUTH_EXPAND_UP_MS, USER_MENU_AUTH_CONTENT_HIDDEN_CLASS, USER_MENU_AUTH_FADE_CLASS, USER_MENU_AUTH_FADE_MS, USER_MENU_AUTH_LAYOUT_VARS, USER_MENU_AUTH_LOCKED_CLASS, USER_MENU_AUTH_PHASE_CLASSES, USER_MENU_AUTH_RESTORE_FADE_CLASS, USER_MENU_AUTH_RESULT_DRAW_CLASS, USER_MENU_AUTH_RESULT_FADE_OUT_CLASS, USER_MENU_AUTH_RESULT_DRAW_MS, USER_MENU_AUTH_RUNNING_CLASS, USER_MENU_AUTH_SHRINK_DOWN_CLASS, USER_MENU_AUTH_SHRINK_FULL_CLASS, USER_MENU_AUTH_SHRINK_MS, USER_MENU_AUTH_SHRINK_TO_FULL_CLASS, USER_MENU_AUTH_VAR_EXPAND_HEIGHT, USER_MENU_AUTH_VAR_EXPAND_LEFT, USER_MENU_AUTH_VAR_EXPAND_TOP, USER_MENU_AUTH_VAR_EXPAND_WIDTH, USER_MENU_AUTH_VAR_EXTENSION_HEIGHT, USER_MENU_AUTH_VAR_EXTENSION_LEFT, USER_MENU_AUTH_VAR_EXTENSION_TOP, USER_MENU_AUTH_VAR_EXTENSION_WIDTH, USER_MENU_AUTH_VAR_FULL_HEIGHT, USER_MENU_AUTH_VAR_FULL_LEFT, USER_MENU_AUTH_VAR_FULL_TOP, USER_MENU_AUTH_VAR_FULL_WIDTH, USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, USER_MENU_AUTH_VAR_ORIGIN_LEFT, USER_MENU_AUTH_VAR_ORIGIN_TOP, USER_MENU_AUTH_VAR_ORIGIN_WIDTH, USER_MENU_AUTH_VAR_RESTORE_HEIGHT, USER_MENU_AUTH_VAR_RESTORE_LEFT, USER_MENU_AUTH_VAR_RESTORE_TOP, USER_MENU_AUTH_VAR_RESTORE_WIDTH, USER_MENU_AUTH_VISIBLE_CLASS, USER_MENU_BACKDROP_CLOSING_CLASS, USER_MENU_BACKDROP_VISIBLE_CLASS, USER_MENU_BLUR_MS, USER_MENU_CONTENT_SELECTOR, USER_MENU_HEADER_BTN_ACTIVE_CLASS, USER_MENU_HIDDEN_CLASS, USER_MENU_OPEN_BTN_SELECTOR, USER_MENU_OPEN_CLASS, USER_MENU_PANEL_CLOSING_CLASS, USER_MENU_PANEL_MOUNTED_CLASS, USER_MENU_PANEL_OPEN_CLASS, USER_MENU_PANEL_SELECTOR, USER_MENU_ROOT_SELECTOR, USER_MENU_SLIDE_MS, USER_MENU_STATUS_ERROR_SELECTOR, USER_MENU_STATUS_ICON_MARK_SELECTOR, USER_MENU_STATUS_LOADING_SELECTOR, USER_MENU_STATUS_SUCCESS_SELECTOR } from "@/js/const/const.user-menu.js";

let userMenuIsOpen = false;
let userMenuIsAnimating = false;

/** Opens the user menu: blur backdrop, then slide in the panel. */
async function userMenuOpenAnimation() {
  const root = document.querySelector(USER_MENU_ROOT_SELECTOR);
  if (!root || userMenuIsAnimating || userMenuIsOpen) {
    return;
  }

  userMenuIsAnimating = true;

  document.querySelectorAll(USER_MENU_OPEN_BTN_SELECTOR).forEach((button) => {
    button.classList.add(USER_MENU_HEADER_BTN_ACTIVE_CLASS);
  });

  root.classList.add(USER_MENU_OPEN_CLASS);
  root.classList.add(USER_MENU_BACKDROP_VISIBLE_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_BLUR_MS));

  root.classList.add(USER_MENU_PANEL_MOUNTED_CLASS);
  root.classList.add(USER_MENU_PANEL_OPEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_SLIDE_MS));

  userMenuIsOpen = true;
  userMenuIsAnimating = false;
}

/** Closes the user menu: slide out panel, then unblur backdrop. */
async function userMenuCloseAnimation() {
  const root = document.querySelector(USER_MENU_ROOT_SELECTOR);
  if (!root || userMenuIsAnimating || !userMenuIsOpen) {
    return;
  }

  userMenuIsAnimating = true;

  document.querySelectorAll(USER_MENU_OPEN_BTN_SELECTOR).forEach((button) => {
    button.classList.remove(USER_MENU_HEADER_BTN_ACTIVE_CLASS);
  });

  root.classList.remove(USER_MENU_PANEL_OPEN_CLASS);
  root.classList.add(USER_MENU_PANEL_CLOSING_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_SLIDE_MS));
  root.classList.remove(USER_MENU_PANEL_CLOSING_CLASS);
  root.classList.remove(USER_MENU_PANEL_MOUNTED_CLASS);

  root.classList.remove(USER_MENU_BACKDROP_VISIBLE_CLASS);
  root.classList.add(USER_MENU_BACKDROP_CLOSING_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_BLUR_MS));
  root.classList.remove(USER_MENU_BACKDROP_CLOSING_CLASS);

  root.classList.remove(USER_MENU_OPEN_CLASS);
  userMenuIsOpen = false;
  userMenuIsAnimating = false;
}

/** Runs the full sign-in / sign-up / sign-out panel animation sequence. */
async function userMenuAuthAnimation(authPromise, onRestore) {
  const root = document.querySelector(USER_MENU_ROOT_SELECTOR);
  const panel = document.querySelector(USER_MENU_PANEL_SELECTOR);
  const content = document.querySelector(USER_MENU_CONTENT_SELECTOR);
  const animationContainer = document.querySelector(USER_MENU_ANIMATION_CONTAINER_SELECTOR);
  const loadingStatus = document.querySelector(USER_MENU_STATUS_LOADING_SELECTOR);
  const successStatus = document.querySelector(USER_MENU_STATUS_SUCCESS_SELECTOR);
  const errorStatus = document.querySelector(USER_MENU_STATUS_ERROR_SELECTOR);

  if (!root || !panel || !content || !animationContainer || !loadingStatus || !successStatus || !errorStatus) {
    return false;
  }

  const statusElements = [loadingStatus, successStatus, errorStatus];
  let statusIndex = 0;
  for (statusIndex = 0; statusIndex < statusElements.length; statusIndex += 1) {
    const status = statusElements[statusIndex];
    status.classList.add(USER_MENU_HIDDEN_CLASS);
    status.classList.remove(
      USER_MENU_AUTH_DOTS_FADE_IN_CLASS,
      USER_MENU_AUTH_DOTS_FADE_OUT_CLASS,
      USER_MENU_AUTH_DOTS_RUN_CLASS,
      USER_MENU_AUTH_RESULT_DRAW_CLASS,
      USER_MENU_AUTH_RESULT_FADE_OUT_CLASS,
      "is-animating",
      "is-drawn",
    );
  }

  root.classList.remove(USER_MENU_AUTH_LOCKED_CLASS);
  panel.classList.remove(
    USER_MENU_AUTH_RUNNING_CLASS,
    USER_MENU_AUTH_FADE_CLASS,
    USER_MENU_AUTH_CONTENT_HIDDEN_CLASS,
    USER_MENU_AUTH_RESTORE_FADE_CLASS,
  );
  animationContainer.classList.remove(
    USER_MENU_AUTH_VISIBLE_CLASS,
    ...USER_MENU_AUTH_PHASE_CLASSES,
  );

  let layoutVarIndex = 0;
  for (layoutVarIndex = 0; layoutVarIndex < USER_MENU_AUTH_LAYOUT_VARS.length; layoutVarIndex += 1) {
    animationContainer.style.removeProperty(USER_MENU_AUTH_LAYOUT_VARS[layoutVarIndex]);
  }

  const panelRect = panel.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();
  const panelStyles = getComputedStyle(panel);
  const panelPaddingTop = Number.parseFloat(panelStyles.paddingTop) || 12;
  const overlayRect = root.getBoundingClientRect();
  const overlayStyles = getComputedStyle(root);
  const overlayPaddingTop = Number.parseFloat(overlayStyles.paddingTop) || 0;
  const overlayPaddingRight = Number.parseFloat(overlayStyles.paddingRight) || 0;
  const overlayPaddingBottom = Number.parseFloat(overlayStyles.paddingBottom) || 0;
  const overlayPaddingLeft = Number.parseFloat(overlayStyles.paddingLeft) || 0;
  const extensionInnerTop = overlayRect.top + overlayPaddingTop;
  const extensionInnerLeft = overlayRect.left + overlayPaddingLeft;
  const extensionInnerWidth = overlayRect.width - overlayPaddingLeft - overlayPaddingRight;
  const extensionInnerHeight = overlayRect.height - overlayPaddingTop - overlayPaddingBottom;
  const layout = {
    originTop: contentRect.top - panelRect.top,
    originLeft: contentRect.left - panelRect.left,
    originWidth: contentRect.width,
    originHeight: contentRect.height,
    expandUpTop: panelPaddingTop,
    expandUpLeft: contentRect.left - panelRect.left,
    expandUpWidth: contentRect.width,
    expandUpHeight: contentRect.bottom - panelRect.top - panelPaddingTop,
    fullTop: 0,
    fullLeft: 0,
    fullWidth: panel.offsetWidth,
    fullHeight: panel.offsetHeight,
    extensionTop: extensionInnerTop - panelRect.top,
    extensionLeft: extensionInnerLeft - panelRect.left,
    extensionWidth: extensionInnerWidth,
    extensionHeight: extensionInnerHeight,
  };
  const circleDuration = Math.round(USER_MENU_AUTH_RESULT_DRAW_MS * 0.45);
  const markDuration = USER_MENU_AUTH_RESULT_DRAW_MS - circleDuration;
  const timeoutBufferMs = USER_MENU_AUTH_BUFFER_MS;

  root.classList.add(USER_MENU_AUTH_LOCKED_CLASS);

  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_TOP, `${layout.originTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_LEFT, `${layout.originLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_WIDTH, `${layout.originWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, `${layout.originHeight}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXPAND_TOP, `${layout.expandUpTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXPAND_LEFT, `${layout.expandUpLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXPAND_WIDTH, `${layout.expandUpWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXPAND_HEIGHT, `${layout.expandUpHeight}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_FULL_TOP, `${layout.fullTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_FULL_LEFT, `${layout.fullLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_FULL_WIDTH, `${layout.fullWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_FULL_HEIGHT, `${layout.fullHeight}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXTENSION_TOP, `${layout.extensionTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXTENSION_LEFT, `${layout.extensionLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXTENSION_WIDTH, `${layout.extensionWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXTENSION_HEIGHT, `${layout.extensionHeight}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_RESTORE_TOP, `${layout.originTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_RESTORE_LEFT, `${layout.originLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_RESTORE_WIDTH, `${layout.originWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_RESTORE_HEIGHT, `${layout.originHeight}px`);
  animationContainer.classList.add(USER_MENU_AUTH_ABSOLUTE_CLASS, USER_MENU_AUTH_VISIBLE_CLASS);

  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  panel.classList.add(USER_MENU_AUTH_FADE_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_FADE_MS));
  panel.classList.remove(USER_MENU_AUTH_FADE_CLASS);
  panel.classList.add(USER_MENU_AUTH_RUNNING_CLASS, USER_MENU_AUTH_CONTENT_HIDDEN_CLASS);

  await new Promise((resolve) => setTimeout(resolve, 0));

  animationContainer.classList.add(USER_MENU_AUTH_EXPAND_UP_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_EXPAND_UP_MS + timeoutBufferMs));
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_TOP, `${layout.expandUpTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_LEFT, `${layout.expandUpLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_WIDTH, `${layout.expandUpWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, `${layout.expandUpHeight}px`);
  animationContainer.classList.remove(USER_MENU_AUTH_EXPAND_UP_CLASS);

  await new Promise((resolve) => setTimeout(resolve, 0));
  animationContainer.classList.add(USER_MENU_AUTH_EXPAND_FULL_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_EXPAND_FULL_MS + timeoutBufferMs));
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_TOP, `${layout.fullTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_LEFT, `${layout.fullLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_WIDTH, `${layout.fullWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, `${layout.fullHeight}px`);
  animationContainer.classList.remove(USER_MENU_AUTH_EXPAND_FULL_CLASS);

  await new Promise((resolve) => setTimeout(resolve, 0));
  animationContainer.classList.add(USER_MENU_AUTH_EXPAND_EXTENSION_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_EXPAND_EXTENSION_MS + timeoutBufferMs));
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_TOP, `${layout.extensionTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_LEFT, `${layout.extensionLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_WIDTH, `${layout.extensionWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, `${layout.extensionHeight}px`);
  animationContainer.classList.remove(USER_MENU_AUTH_EXPAND_EXTENSION_CLASS);

  loadingStatus.classList.remove(USER_MENU_HIDDEN_CLASS);
  loadingStatus.classList.add(USER_MENU_AUTH_DOTS_FADE_IN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_FADE_MS + timeoutBufferMs));
  loadingStatus.classList.remove(USER_MENU_AUTH_DOTS_FADE_IN_CLASS);
  loadingStatus.classList.add(USER_MENU_AUTH_DOTS_RUN_CLASS);

  const authResults = await Promise.all([
    new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_DOTS_RUN_MS)),
    authPromise,
  ]);
  const authResult = Boolean(authResults[1]);

  loadingStatus.classList.remove(USER_MENU_AUTH_DOTS_RUN_CLASS);
  loadingStatus.classList.add(USER_MENU_AUTH_DOTS_FADE_OUT_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_FADE_MS + timeoutBufferMs));
  loadingStatus.classList.remove(USER_MENU_AUTH_DOTS_FADE_OUT_CLASS);
  loadingStatus.classList.add(USER_MENU_HIDDEN_CLASS);

  const resultStatus = authResult ? successStatus : errorStatus;
  const marks = resultStatus.querySelectorAll(USER_MENU_STATUS_ICON_MARK_SELECTOR);
  resultStatus.classList.remove(USER_MENU_HIDDEN_CLASS);
  resultStatus.classList.add(USER_MENU_AUTH_RESULT_DRAW_CLASS, "is-animating");
  await new Promise((resolve) => setTimeout(resolve, circleDuration + timeoutBufferMs));
  await new Promise((resolve) => setTimeout(resolve, markDuration + timeoutBufferMs));
  resultStatus.classList.remove("is-animating");
  resultStatus.classList.add("is-drawn");
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_FADE_MS));

  resultStatus.classList.add(USER_MENU_AUTH_RESULT_FADE_OUT_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_FADE_MS + timeoutBufferMs));
  resultStatus.classList.remove(
    USER_MENU_AUTH_RESULT_DRAW_CLASS,
    USER_MENU_AUTH_RESULT_FADE_OUT_CLASS,
    "is-drawn",
  );
  resultStatus.classList.add(USER_MENU_HIDDEN_CLASS);

  if (authResult && onRestore) {
    await onRestore();
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  }

  const targetPanelRect = panel.getBoundingClientRect();
  const targetContentRect = content.getBoundingClientRect();
  const targetPanelStyles = getComputedStyle(panel);
  const targetPanelPaddingTop = Number.parseFloat(targetPanelStyles.paddingTop) || 12;
  const currentOverlayRect = root.getBoundingClientRect();
  const currentOverlayStyles = getComputedStyle(root);
  const currentOverlayPaddingTop = Number.parseFloat(currentOverlayStyles.paddingTop) || 0;
  const currentOverlayPaddingRight = Number.parseFloat(currentOverlayStyles.paddingRight) || 0;
  const currentOverlayPaddingBottom = Number.parseFloat(currentOverlayStyles.paddingBottom) || 0;
  const currentOverlayPaddingLeft = Number.parseFloat(currentOverlayStyles.paddingLeft) || 0;
  const currentExtensionInnerTop = currentOverlayRect.top + currentOverlayPaddingTop;
  const currentExtensionInnerLeft = currentOverlayRect.left + currentOverlayPaddingLeft;
  const currentExtensionInnerWidth =
    currentOverlayRect.width - currentOverlayPaddingLeft - currentOverlayPaddingRight;
  const currentExtensionInnerHeight =
    currentOverlayRect.height - currentOverlayPaddingTop - currentOverlayPaddingBottom;
  const extensionLayout = {
    extensionTop: currentExtensionInnerTop - targetPanelRect.top,
    extensionLeft: currentExtensionInnerLeft - targetPanelRect.left,
    extensionWidth: currentExtensionInnerWidth,
    extensionHeight: currentExtensionInnerHeight,
  };
  const shrinkLayout = authResult
    ? {
        fullTop: 0,
        fullLeft: 0,
        fullWidth: panel.offsetWidth,
        fullHeight: panel.offsetHeight,
        expandUpTop: targetPanelPaddingTop,
        expandUpLeft: targetContentRect.left - targetPanelRect.left,
        expandUpWidth: targetContentRect.width,
        expandUpHeight: targetContentRect.bottom - targetPanelRect.top - targetPanelPaddingTop,
        restoreTop: targetContentRect.top - targetPanelRect.top,
        restoreLeft: targetContentRect.left - targetPanelRect.left,
        restoreWidth: targetContentRect.width,
        restoreHeight: targetContentRect.height,
      }
    : {
        fullTop: layout.fullTop,
        fullLeft: layout.fullLeft,
        fullWidth: layout.fullWidth,
        fullHeight: layout.fullHeight,
        expandUpTop: layout.expandUpTop,
        expandUpLeft: layout.expandUpLeft,
        expandUpWidth: layout.expandUpWidth,
        expandUpHeight: layout.expandUpHeight,
        restoreTop: layout.originTop,
        restoreLeft: layout.originLeft,
        restoreWidth: layout.originWidth,
        restoreHeight: layout.originHeight,
      };

  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXTENSION_TOP, `${extensionLayout.extensionTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXTENSION_LEFT, `${extensionLayout.extensionLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXTENSION_WIDTH, `${extensionLayout.extensionWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXTENSION_HEIGHT, `${extensionLayout.extensionHeight}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_TOP, `${extensionLayout.extensionTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_LEFT, `${extensionLayout.extensionLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_WIDTH, `${extensionLayout.extensionWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, `${extensionLayout.extensionHeight}px`);

  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_FULL_TOP, `${shrinkLayout.fullTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_FULL_LEFT, `${shrinkLayout.fullLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_FULL_WIDTH, `${shrinkLayout.fullWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_FULL_HEIGHT, `${shrinkLayout.fullHeight}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXPAND_TOP, `${shrinkLayout.expandUpTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXPAND_LEFT, `${shrinkLayout.expandUpLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXPAND_WIDTH, `${shrinkLayout.expandUpWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_EXPAND_HEIGHT, `${shrinkLayout.expandUpHeight}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_RESTORE_TOP, `${shrinkLayout.restoreTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_RESTORE_LEFT, `${shrinkLayout.restoreLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_RESTORE_WIDTH, `${shrinkLayout.restoreWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_RESTORE_HEIGHT, `${shrinkLayout.restoreHeight}px`);

  animationContainer.classList.add(USER_MENU_AUTH_SHRINK_TO_FULL_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_SHRINK_MS + timeoutBufferMs));
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_TOP, `${shrinkLayout.fullTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_LEFT, `${shrinkLayout.fullLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_WIDTH, `${shrinkLayout.fullWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, `${shrinkLayout.fullHeight}px`);
  animationContainer.classList.remove(USER_MENU_AUTH_SHRINK_TO_FULL_CLASS);

  await new Promise((resolve) => setTimeout(resolve, 0));
  animationContainer.classList.add(USER_MENU_AUTH_SHRINK_FULL_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_SHRINK_MS + timeoutBufferMs));
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_TOP, `${shrinkLayout.expandUpTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_LEFT, `${shrinkLayout.expandUpLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_WIDTH, `${shrinkLayout.expandUpWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, `${shrinkLayout.expandUpHeight}px`);
  animationContainer.classList.remove(USER_MENU_AUTH_SHRINK_FULL_CLASS);

  await new Promise((resolve) => setTimeout(resolve, 0));
  animationContainer.classList.add(USER_MENU_AUTH_SHRINK_DOWN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_SHRINK_MS + timeoutBufferMs));
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_TOP, `${shrinkLayout.restoreTop}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_LEFT, `${shrinkLayout.restoreLeft}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_WIDTH, `${shrinkLayout.restoreWidth}px`);
  animationContainer.style.setProperty(USER_MENU_AUTH_VAR_ORIGIN_HEIGHT, `${shrinkLayout.restoreHeight}px`);
  animationContainer.classList.remove(USER_MENU_AUTH_SHRINK_DOWN_CLASS);

  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
  panel.classList.add(USER_MENU_AUTH_RESTORE_FADE_CLASS);
  panel.classList.remove(USER_MENU_AUTH_CONTENT_HIDDEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_FADE_MS + timeoutBufferMs));

  root.classList.remove(USER_MENU_AUTH_LOCKED_CLASS);
  panel.classList.remove(
    USER_MENU_AUTH_RUNNING_CLASS,
    USER_MENU_AUTH_CONTENT_HIDDEN_CLASS,
    USER_MENU_AUTH_RESTORE_FADE_CLASS,
  );

  animationContainer.classList.remove(USER_MENU_AUTH_VISIBLE_CLASS);

  let phaseIndex = 0;
  for (phaseIndex = 0; phaseIndex < USER_MENU_AUTH_PHASE_CLASSES.length; phaseIndex += 1) {
    animationContainer.classList.remove(USER_MENU_AUTH_PHASE_CLASSES[phaseIndex]);
  }
  for (layoutVarIndex = 0; layoutVarIndex < USER_MENU_AUTH_LAYOUT_VARS.length; layoutVarIndex += 1) {
    animationContainer.style.removeProperty(USER_MENU_AUTH_LAYOUT_VARS[layoutVarIndex]);
  }
  animationContainer.classList.remove(USER_MENU_AUTH_ABSOLUTE_CLASS);

  for (statusIndex = 0; statusIndex < statusElements.length; statusIndex += 1) {
    const status = statusElements[statusIndex];
    status.classList.add(USER_MENU_HIDDEN_CLASS);
    status.classList.remove(
      USER_MENU_AUTH_DOTS_FADE_IN_CLASS,
      USER_MENU_AUTH_DOTS_FADE_OUT_CLASS,
      USER_MENU_AUTH_DOTS_RUN_CLASS,
      USER_MENU_AUTH_RESULT_DRAW_CLASS,
      USER_MENU_AUTH_RESULT_FADE_OUT_CLASS,
      "is-animating",
      "is-drawn",
    );
  }

  return authResult;
}

export { userMenuAuthAnimation, userMenuCloseAnimation, userMenuOpenAnimation };

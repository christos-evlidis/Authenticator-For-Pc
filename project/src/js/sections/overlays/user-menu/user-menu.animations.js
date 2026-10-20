import {
  USER_MENU_ANIMATION_CONTAINER_SELECTOR,
  USER_MENU_AUTH_BUFFER_MS,
  USER_MENU_AUTH_CARD_EXTENSION_CLASS,
  USER_MENU_AUTH_CARD_PANEL_FULL_CLASS,
  USER_MENU_AUTH_CARD_PANEL_UP_CLASS,
  USER_MENU_AUTH_CARD_SIGNED_IN_CLASS,
  USER_MENU_AUTH_CARD_SIGNED_OUT_CLASS,
  USER_MENU_AUTH_CONTENT_HIDDEN_CLASS,
  USER_MENU_AUTH_DOTS_FADE_IN_CLASS,
  USER_MENU_AUTH_DOTS_FADE_OUT_CLASS,
  USER_MENU_AUTH_DOTS_RUN_CLASS,
  USER_MENU_AUTH_DOTS_RUN_MS,
  USER_MENU_AUTH_EXPAND_EXTENSION_MS,
  USER_MENU_AUTH_EXPAND_FULL_MS,
  USER_MENU_AUTH_EXPAND_UP_MS,
  USER_MENU_AUTH_FADE_CLASS,
  USER_MENU_AUTH_FADE_MS,
  USER_MENU_AUTH_LOCKED_CLASS,
  USER_MENU_AUTH_PHASE_CLASSES,
  USER_MENU_AUTH_RESTORE_FADE_CLASS,
  USER_MENU_AUTH_RESULT_DRAW_CLASS,
  USER_MENU_AUTH_RESULT_DRAW_MS,
  USER_MENU_AUTH_RESULT_FADE_OUT_CLASS,
  USER_MENU_AUTH_RUNNING_CLASS,
  USER_MENU_AUTH_SHRINK_MS,
  USER_MENU_AUTH_VISIBLE_CLASS,
  USER_MENU_BACKDROP_CLOSING_CLASS,
  USER_MENU_BACKDROP_VISIBLE_CLASS,
  USER_MENU_BLUR_MS,
  USER_MENU_CONTENT_SELECTOR,
  USER_MENU_HEADER_BTN_ACTIVE_CLASS,
  USER_MENU_HIDDEN_CLASS,
  USER_MENU_OPEN_BTN_SELECTOR,
  USER_MENU_OPEN_CLASS,
  USER_MENU_PANEL_CLOSING_CLASS,
  USER_MENU_PANEL_MOUNTED_CLASS,
  USER_MENU_PANEL_OPEN_CLASS,
  USER_MENU_PANEL_SELECTOR,
  USER_MENU_ROOT_SELECTOR,
  USER_MENU_SIGNED_IN_VIEW_SELECTOR,
  USER_MENU_SLIDE_MS,
  USER_MENU_STATUS_ERROR_SELECTOR,
  USER_MENU_STATUS_ICON_MARK_SELECTOR,
  USER_MENU_STATUS_LOADING_SELECTOR,
  USER_MENU_STATUS_SUCCESS_SELECTOR,
} from "@/js/sections/overlays/user-menu/user-menu.const.js";

let userMenuIsOpen = false;
let userMenuIsAnimating = false;

/** Opens the user menu: blur backdrop, then slide in the panel. */
async function userMenuOpen() {
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
async function userMenuClose() {
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

  const circleDuration = Math.round(USER_MENU_AUTH_RESULT_DRAW_MS * 0.45);
  const markDuration = USER_MENU_AUTH_RESULT_DRAW_MS - circleDuration;
  const timeoutBufferMs = USER_MENU_AUTH_BUFFER_MS;

  // Determine starting view (signed-in account vs signed-out form)
  const signedInView = document.querySelector(USER_MENU_SIGNED_IN_VIEW_SELECTOR);
  const isStartingSignedIn = signedInView && !signedInView.classList.contains(USER_MENU_HIDDEN_CLASS);
  const initialClass = isStartingSignedIn
    ? USER_MENU_AUTH_CARD_SIGNED_IN_CLASS
    : USER_MENU_AUTH_CARD_SIGNED_OUT_CLASS;

  root.classList.add(USER_MENU_AUTH_LOCKED_CLASS);

  // 1. Initial view-aware position
  animationContainer.classList.add(initialClass, USER_MENU_AUTH_VISIBLE_CLASS);

  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  // Fade out form content
  panel.classList.add(USER_MENU_AUTH_FADE_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_FADE_MS));
  panel.classList.remove(USER_MENU_AUTH_FADE_CLASS);
  panel.classList.add(USER_MENU_AUTH_RUNNING_CLASS, USER_MENU_AUTH_CONTENT_HIDDEN_CLASS);

  await new Promise((resolve) => setTimeout(resolve, 0));

  // 2. Expand card Up (Phase 1)
  animationContainer.classList.remove(initialClass);
  animationContainer.classList.add(USER_MENU_AUTH_CARD_PANEL_UP_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_EXPAND_UP_MS + timeoutBufferMs));

  // 3. Expand card to Full panel (Phase 2)
  animationContainer.classList.remove(USER_MENU_AUTH_CARD_PANEL_UP_CLASS);
  animationContainer.classList.add(USER_MENU_AUTH_CARD_PANEL_FULL_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_EXPAND_FULL_MS + timeoutBufferMs));

  // 4. Expand card to Full extension frame (Phase 3)
  animationContainer.classList.remove(USER_MENU_AUTH_CARD_PANEL_FULL_CLASS);
  animationContainer.classList.add(USER_MENU_AUTH_CARD_EXTENSION_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_EXPAND_EXTENSION_MS + timeoutBufferMs));

  // 5. Run loading dots
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

  // 6. Draw checkmark / error mark
  const resultStatus = authResult ? successStatus : errorStatus;
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

  // Determine target view after restore
  const isEndingSignedIn = signedInView && !signedInView.classList.contains(USER_MENU_HIDDEN_CLASS);
  const targetShrinkClass = authResult
    ? (isEndingSignedIn ? USER_MENU_AUTH_CARD_SIGNED_IN_CLASS : USER_MENU_AUTH_CARD_SIGNED_OUT_CLASS)
    : initialClass;

  // 7. Shrink back down in reverse: extension -> panel-full -> panel-up -> target card view
  animationContainer.classList.remove(USER_MENU_AUTH_CARD_EXTENSION_CLASS);
  animationContainer.classList.add(USER_MENU_AUTH_CARD_PANEL_FULL_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_SHRINK_MS + timeoutBufferMs));

  animationContainer.classList.remove(USER_MENU_AUTH_CARD_PANEL_FULL_CLASS);
  animationContainer.classList.add(USER_MENU_AUTH_CARD_PANEL_UP_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_SHRINK_MS + timeoutBufferMs));

  animationContainer.classList.remove(USER_MENU_AUTH_CARD_PANEL_UP_CLASS);
  animationContainer.classList.add(targetShrinkClass);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_SHRINK_MS + timeoutBufferMs));

  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  // 8. Restore content fade
  panel.classList.add(USER_MENU_AUTH_RESTORE_FADE_CLASS);
  panel.classList.remove(USER_MENU_AUTH_CONTENT_HIDDEN_CLASS);
  await new Promise((resolve) => setTimeout(resolve, USER_MENU_AUTH_FADE_MS + timeoutBufferMs));

  root.classList.remove(USER_MENU_AUTH_LOCKED_CLASS);
  panel.classList.remove(
    USER_MENU_AUTH_RUNNING_CLASS,
    USER_MENU_AUTH_CONTENT_HIDDEN_CLASS,
    USER_MENU_AUTH_RESTORE_FADE_CLASS,
  );

  animationContainer.classList.remove(
    USER_MENU_AUTH_VISIBLE_CLASS,
    ...USER_MENU_AUTH_PHASE_CLASSES,
  );

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

export { userMenuAuthAnimation, userMenuClose, userMenuOpen };

/**
 * Core section module for rendering and managing authentication codes.
 */
import { appStateGet, appStateSubscribe } from "@/js/app/app.state.js";
import {
  CODES_CARD_SELECTOR,
  CODES_CONTAINER_SELECTOR,
  CODES_DELETE_BTN_SELECTOR,
  CODES_EDIT_BTN_SELECTOR,
  CODES_EMAIL_SELECTOR,
  CODES_HIDDEN_CLASS,
  CODES_HOTP_COUNTER_SELECTOR,
  CODES_NAME_SELECTOR,
  CODES_OTP_CODE_SELECTOR,
  CODES_TEMPLATE_SELECTOR,
} from "@/js/sections/core/codes/codes.const.js";
import {
  BODY_CODES_NO_VIEW_SELECTOR,
  BODY_CODES_YES_VIEW_SELECTOR,
  BODY_CONTENT_FADE_IN_CLASS,
  BODY_CONTENT_FADE_OUT_CLASS,
  BODY_CONTENT_PENDING_CLASS,
  BODY_FADE_MS,
  BODY_HIDDEN_CLASS,
} from "@/js/sections/core/body/body.const.js";
import {
  codesAnimationDelete,
  codesAnimationAddSpacerExpand,
  codesAnimationAddSlide,
} from "@/js/sections/core/codes/codes.animations.js";
import { otpActionGenerate } from "@/js/services/otp/action/generate.js";

import { otpTypeHotp } from "@/js/services/otp/type/hotp.js";
import { otpUtilOptions } from "@/js/services/otp/util/options.js";
import { vaultActionDelete } from "@/js/services/vault/action/delete.js";
import { vaultActionUpdate } from "@/js/services/vault/action/update.js";
import { vaultActionSync } from "@/js/services/vault/action/sync.js";
import { vaultStorageReadyGet } from "@/js/services/vault/storage/ready.js";
import { vaultRecordSanitizeList } from "@/js/services/vault/record/sanitize/list.js";
import {
  SEARCH_HIDDEN_CLASS,
  SEARCH_ROOT_SELECTOR,
} from "@/js/sections/core/search-bar/search-bar.const.js";
import {
  searchBarFadeIn,
  searchBarFadeOut,
  searchBarCollapse,
  searchBarExpand,
} from "@/js/sections/core/search-bar/search-bar.animations.js";

let isWheelScrolling = false;
let wheelScrollTimeout = null;

/**
 * Creates an individual code card element populated with account data.
 */
function codesCreateCard(account, template) {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(CODES_CARD_SELECTOR);
  if (!card) {
    return null;
  }

  card.dataset.id = account.id ?? "";

  card.dataset.accountId = String(account.id);
  const nameEl = card.querySelector(CODES_NAME_SELECTOR);
  if (nameEl) {
    nameEl.textContent = account.name ?? "";
  }

  const emailEl = card.querySelector(CODES_EMAIL_SELECTOR);
  if (emailEl) {
    if (account.email) {
      emailEl.textContent = account.email;
      emailEl.classList.remove(CODES_HIDDEN_CLASS);
    } else {
      emailEl.textContent = "";
      emailEl.classList.add(CODES_HIDDEN_CLASS);
    }
  }

  const otpEl = card.querySelector(CODES_OTP_CODE_SELECTOR);
  if (otpEl) {
    const options = otpUtilOptions(account);
    const code = options ? otpActionGenerate(account.secret, options) : null;
    otpEl.textContent = code ?? "------";
  }

  const counterEl = card.querySelector(CODES_HOTP_COUNTER_SELECTOR);
  if (counterEl) {
    if (otpTypeHotp(account)) {
      counterEl.textContent = String(account.counter ?? 0);
      counterEl.classList.remove(CODES_HIDDEN_CLASS);
    } else {
      counterEl.textContent = "";
      counterEl.classList.add(CODES_HIDDEN_CLASS);
    }
  }

  const editBtn = card.querySelector(CODES_EDIT_BTN_SELECTOR);
  editBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    codesHandleEdit(account, card);
  });

  const deleteBtn = card.querySelector(CODES_DELETE_BTN_SELECTOR);
  deleteBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    codesHandleDelete(account, card);
  });

  return card;
}

/**
 * Handles inline editing for account name and email.
 */
function codesHandleEdit(account, card) {
  const editBtn = card.querySelector(CODES_EDIT_BTN_SELECTOR);
  const deleteBtn = card.querySelector(CODES_DELETE_BTN_SELECTOR);
  const actions = card.querySelector(".account-block__actions");
  const nameEl = card.querySelector(CODES_NAME_SELECTOR);
  const emailEl = card.querySelector(CODES_EMAIL_SELECTOR);

  if (!editBtn || !deleteBtn || !actions || !nameEl) {
    return;
  }

  // If already editing, don't re-enter
  if (card.classList.contains("editing")) {
    return;
  }

  const snapshot = {
    name: (account.name || "").trim(),
    email: (account.email || "").trim(),
  };

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "edit-buttons-container";

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "save-edit-button";
  saveBtn.title = "Save changes";
  saveBtn.setAttribute("aria-label", "Save changes");
  saveBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "cancel-edit-button";
  cancelBtn.title = "Cancel";
  cancelBtn.setAttribute("aria-label", "Cancel edit");
  cancelBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';

  buttonContainer.append(saveBtn, cancelBtn);

  const finish = () => {
    nameEl.contentEditable = "false";
    if (emailEl) {
      emailEl.contentEditable = "false";
      if (!emailEl.textContent.trim()) {
        emailEl.classList.add(CODES_HIDDEN_CLASS);
      }
    }
    buttonContainer.remove();
    editBtn.classList.remove(CODES_HIDDEN_CLASS);
    deleteBtn.classList.remove(CODES_HIDDEN_CLASS);
    card.classList.remove("editing");
  };

  editBtn.classList.add(CODES_HIDDEN_CLASS);
  deleteBtn.classList.add(CODES_HIDDEN_CLASS);
  card.classList.add("editing");
  actions.append(buttonContainer);

  nameEl.contentEditable = "true";
  if (emailEl) {
    emailEl.classList.remove(CODES_HIDDEN_CLASS);
    emailEl.contentEditable = "true";
  }

  // Focus name field and place cursor at end
  nameEl.focus();
  const selection = window.getSelection();
  if (selection) {
    selection.selectAllChildren(nameEl);
    selection.collapseToEnd();
  }

  const save = async () => {
    const newName = nameEl.textContent.trim();
    const newEmail = emailEl ? emailEl.textContent.trim() : "";

    if (!newName) {
      nameEl.textContent = snapshot.name || "Account";
      nameEl.focus();
      return;
    }

    if (newName === snapshot.name && newEmail === snapshot.email) {
      finish();
      return;
    }

    account.name = newName;
    account.email = newEmail || "placeholder@example.com";

    nameEl.textContent = account.name;
    if (emailEl) {
      emailEl.textContent = account.email;
    }

    finish();

    try {
      await vaultActionUpdate(account.id, {
        name: account.name,
        email: account.email,
      });
    } catch (error) {
      console.error("Failed to update account:", error);
    }
  };

  saveBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    void save();
  });

  cancelBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nameEl.textContent = snapshot.name;
    if (emailEl) {
      emailEl.textContent = snapshot.email;
    }
    finish();
  });

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void save();
    } else if (e.key === "Escape") {
      e.preventDefault();
      nameEl.textContent = snapshot.name;
      if (emailEl) {
        emailEl.textContent = snapshot.email;
      }
      finish();
    }
  };

  nameEl.addEventListener("keydown", onKeyDown);
  emailEl?.addEventListener("keydown", onKeyDown);
}

/**
 * Immediately deletes an account with poof animation and cloud/storage sync.
 */
async function codesHandleDelete(account, card) {
  const deleteBtn = card.querySelector(CODES_DELETE_BTN_SELECTOR);
  if (deleteBtn) {
    deleteBtn.disabled = true;
  }

  try {
    const container = document.querySelector(CODES_CONTAINER_SELECTOR);
    const existingCards = container ? container.querySelectorAll(CODES_CARD_SELECTOR) : [];
    const isLastCardInUI = existingCards.length <= 1;

    // 1. Delete from storage and cloud via vaultActionDelete
    const remainingAccounts = await vaultActionDelete(account.id);

    // 2. Play particle poof scatter & card collapse animation
    await codesAnimationDelete(card);

    // 3. Update view if all accounts were deleted
    const safeRemaining = Array.isArray(remainingAccounts) ? remainingAccounts : null;
    const isNoAccountsLeft = safeRemaining !== null ? safeRemaining.length === 0 : isLastCardInUI;

    if (isNoAccountsLeft) {
      const codesNoView = document.querySelector(BODY_CODES_NO_VIEW_SELECTOR);
      const codesYesView = document.querySelector(BODY_CODES_YES_VIEW_SELECTOR);

      // 1. Switch to the empty container view, but keep its inner icon & text invisible during expansion
      codesNoView?.classList.add(BODY_CONTENT_PENDING_CLASS);
      codesYesView?.classList.add(BODY_HIDDEN_CLASS);
      codesNoView?.classList.remove(BODY_HIDDEN_CLASS);

      // 2. Search bar fades out
      await searchBarFadeOut();

      // 3. Body expands upwards by smoothly collapsing the search bar
      await searchBarCollapse();

      // 4. Now that expansion is completely finished, smoothly fade in the icon and text
      codesNoView?.classList.remove(BODY_CONTENT_PENDING_CLASS);
      codesNoView?.classList.add(BODY_CONTENT_FADE_IN_CLASS);
      await new Promise((resolve) => setTimeout(resolve, BODY_FADE_MS));
      codesNoView?.classList.remove(BODY_CONTENT_FADE_IN_CLASS);
    }
  } catch (error) {
    console.error("Failed to delete account:", error);
    if (deleteBtn) {
      deleteBtn.disabled = false;
    }
  }
}

/**
 * Renders account code cards into the codes container and toggles views.
 */
function codesRenderList(accounts) {
  const container = document.querySelector(CODES_CONTAINER_SELECTOR);
  const template = document.querySelector(CODES_TEMPLATE_SELECTOR);
  const codesNoView = document.querySelector(BODY_CODES_NO_VIEW_SELECTOR);
  const codesYesView = document.querySelector(BODY_CODES_YES_VIEW_SELECTOR);
  const searchBar = document.querySelector(SEARCH_ROOT_SELECTOR);

  if (!container || !template) {
    return;
  }

  container.innerHTML = "";

  if (!accounts || accounts.length === 0) {
    codesYesView?.classList.add(BODY_HIDDEN_CLASS);
    codesNoView?.classList.remove(BODY_HIDDEN_CLASS);
    searchBar?.classList.add(SEARCH_HIDDEN_CLASS);
    return;
  }

  const renderedIds = new Set();
  accounts.forEach((account) => {
    const id = String(account.id);
    if (renderedIds.has(id)) {
      return;
    }
    renderedIds.add(id);
    const card = codesCreateCard(account, template);
    if (card) {
      container.appendChild(card);
    }
  });

  codesNoView?.classList.add(BODY_HIDDEN_CLASS);
  codesYesView?.classList.remove(BODY_HIDDEN_CLASS);
  void searchBarFadeIn();
}

/**
 * Updates codes view from current app state, restoring accounts when authenticated.
 */
async function codesRender(state = appStateGet()) {
  if (!state.authState) {
    codesRenderList([]);
    return;
  }

  const synced = await vaultActionSync();
  const accounts = synced ?? vaultRecordSanitizeList(await vaultStorageReadyGet());
  codesRenderList(accounts);
}

/**
 * Initializes codes section behavior and subscribes to state changes.
 */
function codesInit() {
  const container = document.querySelector(CODES_CONTAINER_SELECTOR);
  if (!container) {
    return;
  }

  if (container.dataset.scrollBound !== "true") {
    container.dataset.scrollBound = "true";

    container.addEventListener(
      "wheel",
      (event) => {
        // Allow user to scroll normally if container cannot scroll
        if (container.scrollHeight <= container.clientHeight) {
          return;
        }

        event.preventDefault();

        if (isWheelScrolling) {
          return;
        }

        const cards = container.querySelectorAll(CODES_CARD_SELECTOR);
        if (!cards.length) {
          return;
        }

        const firstCard = cards[0];
        const gap = 10;
        const step = firstCard.getBoundingClientRect().height + gap;

        const direction = event.deltaY > 0 ? 1 : -1;
        const targetScrollTop =
          Math.round((container.scrollTop + direction * step) / step) * step;

        isWheelScrolling = true;
        container.scrollTo({
          top: Math.max(
            0,
            Math.min(targetScrollTop, container.scrollHeight - container.clientHeight)
          ),
          behavior: "smooth",
        });

        clearTimeout(wheelScrollTimeout);
        wheelScrollTimeout = setTimeout(() => {
          isWheelScrolling = false;
        }, 250);
      },
      { passive: false }
    );
  }

  void codesRender();
  appStateSubscribe(codesRender);
}

/**
 * Inserts a newly added account card with top-slide animation.
 */
async function codesActionAdd(account) {
  const container = document.querySelector(CODES_CONTAINER_SELECTOR);
  const template = document.querySelector(CODES_TEMPLATE_SELECTOR);
  const codesNoView = document.querySelector(BODY_CODES_NO_VIEW_SELECTOR);
  const codesYesView = document.querySelector(BODY_CODES_YES_VIEW_SELECTOR);

  if (!container || !template || !account?.secret) {
    return;
  }

  // Deduplicate: if the card is already in the DOM, do not add it again
  const accountId = String(account.id);
  const existingCard = container.querySelector(`[data-account-id="${accountId}"], [data-id="${accountId}"]`);
  if (existingCard) {
    return;
  }

  const existingCards = [...container.querySelectorAll(CODES_CARD_SELECTOR)].filter(
    (card) => !card.classList.contains("account-block--manual-add-spacer")
  );
  const isFirstCard = existingCards.length === 0;

  if (isFirstCard) {
    // 1. Fade out the empty state body icon and text
    codesNoView?.classList.add(BODY_CONTENT_FADE_OUT_CLASS);
    await new Promise((resolve) => setTimeout(resolve, BODY_FADE_MS));
    codesNoView?.classList.remove(BODY_CONTENT_FADE_OUT_CLASS);
    codesNoView?.classList.add(BODY_HIDDEN_CLASS);
    codesYesView?.classList.remove(BODY_HIDDEN_CLASS);

    // 2. Body shrinks downward as search bar expands
    await searchBarExpand();

    // 3. Search bar fades in
    await searchBarFadeIn();
  } else {
    // Already in codes-yes view
    codesNoView?.classList.add(BODY_HIDDEN_CLASS);
    codesYesView?.classList.remove(BODY_HIDDEN_CLASS);
  }

  const card = codesCreateCard(account, template);
  if (!card) {
    return;
  }

  container.scrollTop = 0;

  if (existingCards.length) {
    const spacer = document.createElement("li");
    spacer.className = "account-block account-block--manual-add-spacer";
    spacer.setAttribute("aria-hidden", "true");
    container.prepend(spacer);

    await codesAnimationAddSpacerExpand(spacer);

    spacer.replaceWith(card);
    await codesAnimationAddSlide(card);
    container.scrollTop = 0;
    return;
  }

  container.prepend(card);
  await codesAnimationAddSlide(card);
  container.scrollTop = 0;
}




export { codesInit, codesRender, codesAnimationDelete, codesActionAdd };



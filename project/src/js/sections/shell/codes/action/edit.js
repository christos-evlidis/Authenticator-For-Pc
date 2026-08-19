import { authStorageGet } from "../../../../services/auth/auth-index.js";
import { dataActionUpdate, dataCodeTypeHotp } from "../../../../services/data/data-index.js";

import { headerActionIconsDisable } from "../../header/header-index.js";
import { headerActionIconsEnable } from "../../header/header-index.js";

import { codesStateStore } from "../state/store.js";
import { codesTickerAccountCodeUpdate } from "../ticker/run.js";
import { CODES_DEFAULT_CONTACT } from "../util/contact.js";
import { codesUtilContactDisplay } from "../util/contact.js";
import { codesUtilContactNormalize } from "../util/contact.js";
import { codesUtilEmailValid } from "../util/contact.js";
import { codesUtilHotpCounterDisplay } from "../util/hotp.js";
import { codesUtilHotpCounterParse } from "../util/hotp.js";

import { CODES_HIDDEN_CLASS } from "../../../../const/const.codes.js";

/** Enters inline edit mode for an account card. */
function _codesActionEdit(card, account, els, onCardClick) {
  const editBtn = card.querySelector(".edit-button");
  const deleteBtn = card.querySelector(".delete-button");
  const actions = card.querySelector(".account-block__actions");

  if (!editBtn || !deleteBtn || !actions) {
    return;
  }

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "edit-buttons-container";

  const finish = () => {
    els.name.contentEditable = false;
    els.email.contentEditable = false;

    if (els.counter) {
      els.counter.contentEditable = false;
    }

    buttonContainer.remove();
    editBtn.classList.remove(CODES_HIDDEN_CLASS);
    deleteBtn.classList.remove(CODES_HIDDEN_CLASS);
    card.classList.remove("editing");
    card.addEventListener("click", onCardClick);

    codesStateStore.headerLockedForEdit = false;

    if (codesStateStore.headerLockedForEdit || codesStateStore.headerLockedForDelete) {
      headerActionIconsDisable();
    } else {
      headerActionIconsEnable();
    }
  };

  editBtn.classList.add(CODES_HIDDEN_CLASS);
  deleteBtn.classList.add(CODES_HIDDEN_CLASS);
  card.classList.add("editing");
  card.removeEventListener("click", onCardClick);

  const isHotp = dataCodeTypeHotp(account);

  els.name.contentEditable = true;
  els.email.contentEditable = true;

  if (isHotp && els.counter) {
    els.counter.contentEditable = true;
    els.counter.focus();
  } else {
    els.email.focus();
  }

  codesStateStore.headerLockedForEdit = true;

  if (codesStateStore.headerLockedForEdit || codesStateStore.headerLockedForDelete) {
    headerActionIconsDisable();
  } else {
    headerActionIconsEnable();
  }

  const snapshot = {
    name: (account.name || "Account").trim(),
    contact: codesUtilContactDisplay(account).trim(),
    counter: isHotp ? codesUtilHotpCounterDisplay(account) : null,
  };

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.className = "save-edit-button";
  saveButton.title = "Save changes";
  saveButton.setAttribute("aria-label", "Save changes");
  saveButton.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "cancel-edit-button";
  cancelButton.title = "Cancel";
  cancelButton.setAttribute("aria-label", "Cancel edit");
  cancelButton.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';

  buttonContainer.append(saveButton, cancelButton);
  actions.append(buttonContainer);

  saveButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const newName = els.name.textContent.trim();
    const contactLine = els.email.textContent.trim();
    let newEmail = "";
    let newUsername = "";

    if (account.email) {
      newEmail = codesUtilContactNormalize(contactLine);
    } else {
      newUsername = codesUtilContactNormalize(contactLine);
    }

    if (!newName) {
      window.alert("Account name cannot be empty");
      return;
    }

    let newCounter = null;

    if (isHotp && els.counter) {
      newCounter = codesUtilHotpCounterParse(els.counter.textContent);

      if (newCounter == null) {
        window.alert("Enter a valid counter (0 or greater).");
        return;
      }
    }

    const counterUnchanged = !isHotp || String(newCounter) === snapshot.counter;

    if (newName === snapshot.name && contactLine === snapshot.contact && counterUnchanged) {
      finish();
      return;
    }

    if (!newEmail && !newUsername) {
      if (account.email) {
        newEmail = CODES_DEFAULT_CONTACT;
      } else {
        newUsername = CODES_DEFAULT_CONTACT;
      }
    }

    if (account.email && newEmail && !codesUtilEmailValid(newEmail)) {
      window.alert("Please enter a valid email address");
      return;
    }

    const patch = { name: newName };

    if (account.email) {
      patch.email = newEmail;
    } else {
      patch.username = newUsername;
    }

    if (isHotp && !counterUnchanged) {
      patch.counter = newCounter;
    }

    const root = codesStateStore.cardRoots.find((item) => item.card === card);
    const targetAccount = root?.account ?? account;

    targetAccount.name = patch.name;

    if (patch.email !== undefined) {
      targetAccount.email = patch.email;
    }

    if (patch.username !== undefined) {
      targetAccount.username = patch.username;
    }

    if (patch.counter != null) {
      targetAccount.counter = patch.counter;
    }

    if (els.name) {
      els.name.textContent = targetAccount.name || "Account";
    }

    if (els.email) {
      els.email.textContent = codesUtilContactDisplay(targetAccount);
    }

    if (els.counter) {
      els.counter.textContent = codesUtilHotpCounterDisplay(targetAccount);
    }

    if (root) {
      codesTickerAccountCodeUpdate(root);
    }

    finish();

    void authStorageGet().then((authNumber) => {
      if (!authNumber) {
        return;
      }

      void (async () => {
        try {
          await dataActionUpdate(authNumber, account.id, patch);
        } catch (error) {
          console.error("Failed to update account:", error);
          window.alert("Could not save changes. Please try again.");
        }
      })();
    });
  });

  cancelButton.addEventListener("click", (event) => {
    event.stopPropagation();
    els.name.textContent = snapshot.name;
    els.email.textContent = snapshot.contact;

    if (els.counter && snapshot.counter != null) {
      els.counter.textContent = snapshot.counter;
    }

    finish();
  });
}

export { _codesActionEdit as codesActionEdit };

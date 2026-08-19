import { dataCodeTypeHotp } from "../../../../services/data/data-index.js";

import { codesActionCopy } from "../action/copy.js";
import { codesActionDelete } from "../action/delete.js";
import { codesActionEdit } from "../action/edit.js";
import { codesStateStore } from "../state/store.js";
import { codesUtilContactDisplay } from "../util/contact.js";
import { codesUtilHotpCounterDisplay } from "../util/hotp.js";

import { CODES_HIDDEN_CLASS } from "../../../../const/const.codes.js";

/** Clones the card template, binds it to an account, and registers the ticker root. */
function _codesCardCreate(template, account) {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".account-block");

  if (!card) {
    return null;
  }

  const isHotp = dataCodeTypeHotp(account);
  const els = {
    name: card.querySelector(".account-name"),
    email: card.querySelector(".account-email"),
    code: card.querySelector(".otp-code"),
    timer: card.querySelector(".timer-wrapper"),
    pieFg: card.querySelector(".pie-fg"),
    counter: card.querySelector(".account-hotp-counter"),
  };

  if (isHotp) {
    card.classList.add("account-block--hotp");

    if (els.counter) {
      els.counter.textContent = codesUtilHotpCounterDisplay(account);
      els.counter.classList.remove(CODES_HIDDEN_CLASS);
    }
  }

  if (els.name) {
    els.name.textContent = account.name || "Account";
  }

  if (els.email) {
    els.email.textContent = codesUtilContactDisplay(account);
    els.email.classList.remove(CODES_HIDDEN_CLASS);
  }

  card.dataset.accountId = String(account.id);
  card.title = "Copy code";

  const onCardClick = () => {
    void codesActionCopy(card, els.code?.textContent ?? "");
  };

  const editBtn = card.querySelector(".edit-button");
  editBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    codesActionEdit(card, account, els, onCardClick);
  });

  const deleteBtn = card.querySelector(".delete-button");
  deleteBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    codesActionDelete(account, card, deleteBtn);
  });

  card.addEventListener("click", onCardClick);

  codesStateStore.cardRoots.push({
    account,
    els,
    card,
    lastPiePath: { value: "" },
  });

  return card;
}

export { _codesCardCreate as codesCardCreate };

import {
  CODES_COLLAPSED_CLASS,
  CODES_COLLAPSING_CLASS,
  CODES_DELETE_POOF_SHRINK_MS,
  CODES_EXIT_SPACER_CLASS,
  CODES_POOF_EXIT_CLASS,
  CODES_SLIDE_MS,
} from "@/js/const/const.codes.js";

/**
 * Executes the card exit fade and collapse animation.
 */
async function codesAnimationDelete(card) {
  // 1. Play CSS exit animation (scale + fade out)
  card.classList.add(CODES_POOF_EXIT_CLASS);
  await new Promise((resolve) => window.setTimeout(resolve, CODES_DELETE_POOF_SHRINK_MS));

  // 2. Switch to collapse spacer
  card.replaceChildren();
  card.classList.remove(CODES_POOF_EXIT_CLASS);
  card.classList.add(CODES_EXIT_SPACER_CLASS);

  await new Promise((collapseResolve) => {
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(fallbackId);
      card.removeEventListener("transitionend", onTransitionEnd);
      collapseResolve();
    };

    const fallbackId = window.setTimeout(finish, CODES_SLIDE_MS + 60);

    const onTransitionEnd = (event) => {
      if (event.target !== card) {
        return;
      }
      const { propertyName } = event;
      if (
        propertyName === "height" ||
        propertyName === "max-height" ||
        propertyName === "min-height" ||
        propertyName === "margin-top" ||
        propertyName === "margin-bottom"
      ) {
        finish();
      }
    };

    card.addEventListener("transitionend", onTransitionEnd);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add(CODES_COLLAPSING_CLASS, CODES_COLLAPSED_CLASS);
      });
    });
  });

  // 3. Card spacer has now fully collapsed smoothly. Remove card.
  card.remove();
}


/**
 * Expands a temporary spacer element to smoothly push existing cards down.
 */
function codesAnimationAddSpacerExpand(spacer, durationMs = CODES_SLIDE_MS) {
  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(fallbackId);
      spacer.removeEventListener("transitionend", onTransitionEnd);
      resolve();
    };

    const fallbackId = window.setTimeout(finish, durationMs + 60);

    const onTransitionEnd = (event) => {
      if (event.target !== spacer) {
        return;
      }
      const { propertyName } = event;
      if (
        propertyName === "height" ||
        propertyName === "max-height" ||
        propertyName === "min-height"
      ) {
        finish();
      }
    };


    spacer.addEventListener("transitionend", onTransitionEnd);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        spacer.classList.add("is-expanding");
      });
    });
  });
}


/**
 * Slides a newly inserted card in from the top.
 */
function codesAnimationAddSlide(card, durationMs = CODES_SLIDE_MS) {
  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(fallbackId);
      card.removeEventListener("animationend", onAnimationEnd);
      card.classList.remove(
        "is-manual-add-slide",
        "is-manual-add-slide-pending",
        "is-manual-add-slide-active"
      );
      resolve();
    };

    const fallbackId = window.setTimeout(finish, durationMs + 60);

    const onAnimationEnd = (event) => {
      if (
        event.target === card &&
        event.animationName === "account-block-slide-in-from-top"
      ) {
        finish();
      }
    };

    card.addEventListener("animationend", onAnimationEnd);
    card.classList.add("is-manual-add-slide", "is-manual-add-slide-pending");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.remove("is-manual-add-slide-pending");
        card.classList.add("is-manual-add-slide-active");
      });
    });
  });
}

export { codesAnimationDelete, codesAnimationAddSpacerExpand, codesAnimationAddSlide };


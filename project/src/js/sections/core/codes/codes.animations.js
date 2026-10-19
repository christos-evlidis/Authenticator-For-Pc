import {
  CODES_COLLAPSED_CLASS,
  CODES_COLLAPSING_CLASS,
  CODES_DELETE_POOF_MS,
  CODES_DELETE_POOF_SHRINK_MS,
  CODES_EXIT_SPACER_CLASS,
  CODES_POOF_EXIT_CLASS,
  CODES_SLIDE_MS,
} from "@/js/sections/core/codes/codes.const.js";

const DELETE_POOF_PARTICLE_COUNT = 28;
const DELETE_POOF_SHAPES = [
  "circle",
  "squircle",
  "rounded-square",
  "pill-h",
  "pill-v",
  "soft-rect",
  "teardrop",
  "rounded-diamond",
];

/**
 * Executes the particle scatter (poof) and card collapse exit animation.
 */
async function codesAnimationDelete(card) {
  card.classList.add(CODES_POOF_EXIT_CLASS);

  const cardRect = card.getBoundingClientRect();
  const cardStyles = getComputedStyle(card);

  const palette = [
    card,
    card.querySelector(".account-name"),
    card.querySelector(".account-email"),
    card.querySelector(".otp-code"),
    card.querySelector(".edit-button"),
  ]
    .filter(Boolean)
    .flatMap((element) => {
      const styles = getComputedStyle(element);
      return [
        styles.backgroundColor,
        styles.color,
        styles.borderColor,
      ];
    })
    .filter(
      (value) =>
        value &&
        value !== "transparent" &&
        value !== "none" &&
        value !== "rgba(0, 0, 0, 0)"
    );

  const particleColors = [...new Set(palette)];
  const fillColor = particleColors.length ? particleColors : [cardStyles.backgroundColor || "#2b8cee"];
  const spreadX = Math.max(cardRect.width * 0.75, 48);
  const spreadY = Math.max(cardRect.height * 0.75, 48);
  const particleSize = Math.round(Math.min(cardRect.width, cardRect.height) * 0.18);

  const poof = document.createElement("div");
  poof.className = "account-block__poof";
  poof.setAttribute("aria-hidden", "true");
  poof.style.top = `${cardRect.top}px`;
  poof.style.left = `${cardRect.left}px`;
  poof.style.width = `${cardRect.width}px`;
  poof.style.height = `${cardRect.height}px`;
  document.body.append(poof);

  card.animate([{ transform: "scale(0)" }], {
    duration: CODES_DELETE_POOF_SHRINK_MS,
    easing: "ease",
    fill: "forwards",
  });

  const particleAnimations = [];

  for (let index = 0; index < DELETE_POOF_PARTICLE_COUNT; index += 1) {
    const part = document.createElement("span");
    const offsetX = Math.floor(Math.random() * (spreadX * 2 + 1)) - spreadX;
    const offsetY = Math.floor(Math.random() * (spreadY * 2 + 1)) - spreadY;
    const shape =
      DELETE_POOF_SHAPES[Math.floor(Math.random() * DELETE_POOF_SHAPES.length)];

    part.style.backgroundColor = fillColor[index % fillColor.length];
    part.style.clipPath = "none";

    switch (shape) {
      case "circle":
        part.style.width = `${particleSize}px`;
        part.style.height = `${particleSize}px`;
        part.style.borderRadius = "50%";
        break;
      case "squircle":
        part.style.width = `${particleSize}px`;
        part.style.height = `${particleSize}px`;
        part.style.borderRadius = `${Math.round(particleSize * 0.32)}px`;
        break;
      case "rounded-square":
        part.style.width = `${particleSize}px`;
        part.style.height = `${particleSize}px`;
        part.style.borderRadius = `${Math.round(particleSize * 0.22)}px`;
        break;
      case "pill-h":
        part.style.width = `${Math.round(particleSize * 1.35)}px`;
        part.style.height = `${Math.round(particleSize * 0.5)}px`;
        part.style.borderRadius = "999px";
        break;
      case "pill-v":
        part.style.width = `${Math.round(particleSize * 0.5)}px`;
        part.style.height = `${Math.round(particleSize * 1.35)}px`;
        part.style.borderRadius = "999px";
        break;
      case "soft-rect":
        part.style.width = `${Math.round(particleSize * 1.15)}px`;
        part.style.height = `${Math.round(particleSize * 0.72)}px`;
        part.style.borderRadius = `${Math.round(particleSize * 0.24)}px`;
        break;
      case "teardrop":
        part.style.width = `${Math.round(particleSize * 0.72)}px`;
        part.style.height = `${particleSize}px`;
        part.style.borderRadius = "50% 50% 50% 50% / 85% 85% 15% 15%";
        break;
      case "rounded-diamond":
        part.style.width = `${Math.round(particleSize * 0.78)}px`;
        part.style.height = `${Math.round(particleSize * 0.78)}px`;
        part.style.borderRadius = `${Math.round(particleSize * 0.18)}px`;
        part.style.transform = "translate(-50%, -50%) rotate(45deg)";
        break;
      default:
        part.style.width = `${particleSize}px`;
        part.style.height = `${particleSize}px`;
        part.style.borderRadius = "50%";
    }

    poof.append(part);

    particleAnimations.push(
      part.animate(
        [
          {
            transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(0.001)`,
            opacity: 0,
          },
        ],
        {
          duration: CODES_DELETE_POOF_MS,
          easing: "ease",
          fill: "forwards",
        }
      )
    );
  }

  const midMs = Math.round(CODES_DELETE_POOF_MS / 2);

  // After midMs of the poof particles scattering, collapse the card spacer
  await new Promise((resolve) => window.setTimeout(resolve, midMs));

  card.getAnimations().forEach((animation) => animation.cancel());
  card.replaceChildren();
  card.classList.remove(CODES_POOF_EXIT_CLASS);
  const originalHeight = card.offsetHeight || card.getBoundingClientRect().height;
  card.style.height = `${originalHeight}px`;
  card.style.minHeight = `${originalHeight}px`;
  card.style.maxHeight = `${originalHeight}px`;
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

  // Card spacer has now fully collapsed smoothly. Remove card immediately.
  card.remove();

  // Wait for any remaining particle fade out before cleaning up poof layer
  await Promise.allSettled(particleAnimations.map((animation) => animation.finished));
  poof.remove();
}


/**
 * Expands a temporary spacer element to smoothly push existing cards down.
 */
function codesAnimationAddSpacerExpand(spacer, targetHeightPx, durationMs = CODES_SLIDE_MS) {
  if (targetHeightPx) {
    spacer.style.setProperty("--spacer-height", `${targetHeightPx}px`);
  }

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


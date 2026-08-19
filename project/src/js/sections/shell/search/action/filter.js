import { SEARCH_FILTER_CARD_SELECTOR, SEARCH_INPUT_SELECTOR } from "../../../../const/const.search.js";

/** Filters account cards by the current search query. */
function _searchActionFilter() {
  const query =
    document.querySelector(SEARCH_INPUT_SELECTOR)?.value.trim().toLowerCase() ?? "";

  document.querySelectorAll(SEARCH_FILTER_CARD_SELECTOR).forEach((card) => {
    if (!query) {
      card.classList.remove("is-filtered-out");
      return;
    }

    const name = card.querySelector(".account-name")?.textContent.toLowerCase() ?? "";
    const email = card.querySelector(".account-email")?.textContent.toLowerCase() ?? "";
    const matches = name.includes(query) || email.includes(query);
    card.classList.toggle("is-filtered-out", !matches);
  });
}

export { _searchActionFilter as searchActionFilter };

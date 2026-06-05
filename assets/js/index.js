import {
  fetchedDecks,
  getDeckByID,
  removeDeckByID,
} from "./decks.js";

import {
  getDecks,
  deleteDeck,
} from "./api.js";

import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";

import {
  disableSubmitBtn,
  showError,
} from "./new-deck-view.js";

const mainContent = document.querySelector(
  ".page__main-content"
);

const deckList = document.querySelector(".decks__list");

const deckTemplate = document.querySelector(
  "#deck-template"
).content;

const decksSection = document.querySelector("#home");

const deckViewSection = document.querySelector(
  "#deck-view"
);

const carouselSection = document.querySelector(
  "#carousel1"
);

const newDeckViewSection = document.querySelector(
  "#new-deck-view"
);

const notFoundSection = document.querySelector(
  "#not-found"
);

const newDeckButton = document.querySelector(
  "#home .decks__new-deck-btn"
);

function createDeckEl(item) {
  const deckEl = deckTemplate
    .querySelector(".deck")
    .cloneNode(true);

  const deckTitle = deckEl.querySelector(
    ".deck__title"
  );

  const deckCount = deckEl.querySelector(
    ".deck__count"
  );

  const deleteButton = deckEl.querySelector(
    ".deck__delete-btn"
  );

  const deckLink = deckEl.querySelector(
    ".deck__link"
  );

  const color = hexToString(item.color);

  deckTitle.textContent = item.name;
  deckCount.textContent = `${item.cards.length} cards`;
  deckLink.href = `#deck/${item._id}`;

  deckEl.classList.remove("deck_color_green");
  deckEl.classList.add(`deck_color_${color}`);

  deleteButton.addEventListener("click", () => {
    deleteDeck(item._id)
      .then(() => {
        deckEl.remove();
        removeDeckByID(item._id);
      })
      .catch(() => {
        showError(
          "Unable to delete the deck. Please try again."
        );
      });
  });

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckList.prepend(deckEl);
}

function hideAllViews() {
  decksSection.classList.add("decks_hidden");

  deckViewSection.classList.remove(
    "deck-view_visible"
  );

  carouselSection.classList.remove(
    "carousel_visible"
  );

  newDeckViewSection.classList.remove(
    "new-deck-view_visible"
  );

  notFoundSection.classList.remove(
    "not-found_visible"
  );

  mainContent.classList.remove(
    "page__main-content_type_carousel"
  );
}

function renderHomeView() {
  hideAllViews();
  decksSection.classList.remove("decks_hidden");
}

function renderOpenDeckRoute(deck) {
  hideAllViews();
  renderDeckView(deck);
}

function renderCarouselRoute(deck) {
  hideAllViews();

  mainContent.classList.add(
    "page__main-content_type_carousel"
  );

  renderCarouselView(deck);
}

function renderNewDeckView() {
  hideAllViews();

  newDeckViewSection.classList.add(
    "new-deck-view_visible"
  );

  disableSubmitBtn();
}

function renderNotFoundView() {
  hideAllViews();

  notFoundSection.classList.add(
    "not-found_visible"
  );
}

function handleRoute() {
  const hash = window.location.hash.slice(1);

  if (hash === "" || hash === "home") {
    renderHomeView();
  } else if (hash === "new-deck") {
    renderNewDeckView();
  } else if (hash.startsWith("deck/")) {
    const deckId = hash.split("/")[1];
    const currentDeck = getDeckByID(deckId);

    if (currentDeck) {
      renderOpenDeckRoute(currentDeck);
    } else {
      renderNotFoundView();
    }
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    const currentDeck = getDeckByID(deckId);

    if (currentDeck) {
      renderCarouselRoute(currentDeck);
    } else {
      renderNotFoundView();
    }
  } else {
    renderNotFoundView();
  }
}

newDeckButton.addEventListener("click", () => {
  window.location.hash = "new-deck";
});

window.addEventListener(
  "hashchange",
  handleRoute
);

getDecks()
  .then((decks) => {
    fetchedDecks.push(...decks);
    fetchedDecks.forEach(renderDeckEl);
  })
  .catch(() => {
    showError(
      "Unable to load the decks. Please try again."
    );
  })
  .finally(() => {
    handleRoute();
  });
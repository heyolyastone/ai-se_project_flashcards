import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const mainContent = document.querySelector(".page__main-content");
const deckList = document.querySelector(".decks__list");
const deckTemplate = document.querySelector("#deck-template").content;
const decksSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel1");

function createDeckEl(item) {
  const deckEl = deckTemplate.querySelector(".deck").cloneNode(true);
  const deckTitle = deckEl.querySelector(".deck__title");
  const deckCount = deckEl.querySelector(".deck__count");
  const deleteButton = deckEl.querySelector(".deck__delete-btn");
  const deckLink = deckEl.querySelector(".deck__link");

  const color = hexToString(item.color);

  deckTitle.textContent = item.name;
  deckCount.textContent = `${item.cards.length} cards`;
  deckLink.href = `#carousel/${item.id}`;

  deckEl.classList.remove("deck_color_green");
  deckEl.classList.add(`deck_color_${color}`);

  deleteButton.addEventListener("click", () => {
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckList.prepend(deckEl);
}

function renderHomeView() {
  decksSection.classList.remove("decks_hidden");
  notFoundSection.classList.remove("not-found_visible");
  carouselSection.classList.remove("carousel_visible");
  mainContent.classList.remove("page__main-content_type_carousel");
}

function renderNotFoundView() {
  decksSection.classList.add("decks_hidden");
  carouselSection.classList.remove("carousel_visible");
  notFoundSection.classList.add("not-found_visible");
  mainContent.classList.remove("page__main-content_type_carousel");
}

function renderCarouselRoute(deck) {
  decksSection.classList.add("decks_hidden");
  notFoundSection.classList.remove("not-found_visible");
  mainContent.classList.add("page__main-content_type_carousel");
  renderCarouselView(deck);
}

function handleRoute() {
  const hash = window.location.hash.slice(1);

  if (hash === "" || hash === "home") {
    renderHomeView();
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

decks.forEach(renderDeckEl);

window.addEventListener("hashchange", handleRoute);
handleRoute();
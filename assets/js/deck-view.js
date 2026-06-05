const deckViewSection = document.querySelector("#deck-view");
const deckViewTitle = document.querySelector(".deck-view__title");
const deckViewList = document.querySelector(".deck-view__list");
const practiceButton = document.querySelector(
  ".deck-view__practice-btn"
);

/**
 * Renders the selected deck and its cards in the deck view.
 *
 * @param {object} deck - The deck to display.
 * @param {string} deck._id - The unique identifier of the deck.
 * @param {string} deck.name - The name of the deck.
 * @param {Array<object>} deck.cards - The cards contained in the deck.
 * @returns {void}
 */
function renderDeckView(deck) {
  deckViewTitle.textContent = deck.name;
  deckViewList.innerHTML = "";

  deck.cards.forEach((card) => {
    const cardItem = document.createElement("li");

    cardItem.classList.add("deck-view__item");
    cardItem.textContent = card.question;

    deckViewList.append(cardItem);
  });

  practiceButton.href = `#carousel/${deck._id}`;
  deckViewSection.classList.add("deck-view_visible");
}

export { renderDeckView };
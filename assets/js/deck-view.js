const deckViewSection = document.querySelector("#deck-view");
const deckViewTitle = document.querySelector(".deck-view__title");
const deckViewList = document.querySelector(".deck-view__list");
const practiceButton = document.querySelector(".deck-view__practice-btn");

function renderDeckView(deck) {
  deckViewTitle.textContent = deck.name;
  deckViewList.innerHTML = "";

  deck.cards.forEach((card) => {
    const cardItem = document.createElement("li");
    cardItem.classList.add("deck-view__item");
    cardItem.textContent = card.question;
    deckViewList.append(cardItem);
  });

  practiceButton.href = `#carousel/${deck.id}`;
  deckViewSection.classList.add("deck-view_visible");
}

export { renderDeckView };
import { hexToString, removeColorClasses } from "./colors.js";

const carouselSection = document.querySelector("#carousel1");
const carouselTitle = document.querySelector(".carousel__title");
const carouselCard = document.querySelector(".carousel__card");
const carouselCardText = document.querySelector(".carousel__card-text");
const leftButton = document.querySelector(".carousel__btn_type_left");
const rightButton = document.querySelector(".carousel__btn_type_right");
const flipButton = document.querySelector(".carousel__btn_type_flip");

let currentIndex = 0;
let currentDeck = null;
let showingQuestion = true;

function updateDisplay() {
  const currentCard = currentDeck.cards[currentIndex];

  carouselTitle.textContent = `${currentDeck.name}: ${currentIndex + 1}/${
    currentDeck.cards.length
  }`;

  if (showingQuestion) {
    carouselCardText.textContent = currentCard.question;
    carouselCard.classList.remove("carousel__card_color_white");
  } else {
    carouselCardText.textContent = currentCard.answer;
    carouselCard.classList.add("carousel__card_color_white");
  }

  leftButton.disabled = currentIndex === 0;
  rightButton.disabled = currentIndex === currentDeck.cards.length - 1;
}

leftButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    showingQuestion = true;
    updateDisplay();
  }
});

rightButton.addEventListener("click", () => {
  if (currentIndex < currentDeck.cards.length - 1) {
    currentIndex += 1;
    showingQuestion = true;
    updateDisplay();
  }
});

flipButton.addEventListener("click", () => {
  showingQuestion = !showingQuestion;
  updateDisplay();
});

function renderCarouselView(deck) {
  carouselSection.classList.add("carousel_visible");

  currentDeck = deck;
  currentIndex = 0;
  showingQuestion = true;

  const color = hexToString(deck.color);

  removeColorClasses(carouselCard);
  carouselCard.classList.add(`carousel__card_color_${color}`);

  updateDisplay();
}

export { renderCarouselView };
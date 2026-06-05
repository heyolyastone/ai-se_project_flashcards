import { fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

const form = document.querySelector(".new-deck-view__form");
const submitBtn = document.querySelector(".new-deck-view__submit-btn");
const textarea = document.querySelector(".new-deck-view__textarea");

const errorModal = document.querySelector("#error-modal");
const errorModalCloseBtn = errorModal.querySelector(".modal__close");
const errorMessage = errorModal.querySelector(".modal__error");

/**
 * Normalizes a color value into a valid lowercase hexadecimal color.
 *
 * @param {string} color - The color value to normalize.
 * @returns {string} A valid hexadecimal color value.
 */
function normalizeColor(color) {
  if (!color) {
    return "#64d583";
  }

  const hex = color.startsWith("#") ? color.slice(1) : color;

  if (!HEX_DIGITS.test(hex)) {
    return "#64d583";
  }

  return `#${hex.toLowerCase()}`;
}

/**
 * Parses a JSON string.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @returns {object|null} The parsed object, or null if the JSON is invalid.
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * Validates and trims a deck name.
 *
 * @param {*} name - The deck name to validate.
 * @returns {string|null} The validated name, or null if it is invalid.
 */
function validateName(name) {
  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 80
  ) {
    return null;
  }

  return name.trim();
}

/**
 * Displays an error message in the error modal.
 *
 * @param {string} message - The error message to display.
 * @returns {void}
 */
function showError(message) {
  errorMessage.textContent = message;
  errorModal.classList.add("modal_visible");
}

/**
 * Closes the error modal and clears its message.
 *
 * @returns {void}
 */
function closeErrorModal() {
  errorModal.classList.remove("modal_visible");
  errorMessage.textContent = "";
}

/**
 * Enables the new deck form submit button.
 *
 * @returns {void}
 */
function disableSubmitBtn() {
  submitBtn.disabled = false;
}

errorModalCloseBtn.addEventListener("click", closeErrorModal);

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const values = Object.fromEntries(formData);

  const jsonData = parseJSON(textarea.value);

  if (!jsonData) {
    showError(
      "The JSON is invalid. Please check the JSON syntax and try again."
    );
    return;
  }

  const validatedName = validateName(jsonData.name);

  if (!validatedName) {
    showError(
      "The deck name must be a string between 2 and 80 characters."
    );
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    showError(
      'The JSON must include a "cards" field containing an array.'
    );
    return;
  }

  const colorValue = normalizeColor(values.color);

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError(
      "The color in the JSON does not match the selected deck color."
    );
    return;
  }

  const deckData = {
    name: validatedName,
    cards: jsonData.cards,
    color: colorValue,
  };

  submitBtn.disabled = true;

  addDeck(deckData)
    .then((newDeck) => {
      fetchedDecks.push(newDeck);
      form.reset();
      window.location.hash = `deck/${newDeck._id}`;
    })
    .catch(() => {
      showError("Unable to create the deck. Please try again.");
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});

export { disableSubmitBtn, showError };
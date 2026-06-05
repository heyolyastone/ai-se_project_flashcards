const baseUrl =
  "https://se-flashcards-api.en.tripleten-services.com/v1";

const headers = {
  "Content-Type": "application/json",
  Authorization: "019e99d0-0c45-72de-9ace-aaa1160cf8fb",
};

/**
 * Processes a response received from the API.
 *
 * @param {Response} res - The response returned by fetch.
 * @returns {Promise<object>} A promise containing the parsed response data.
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches all decks from the API.
 *
 * @returns {Promise<Array>} A promise containing an array of decks.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, {
    headers,
  }).then(processResponse);
}

/**
 * Sends a new deck to the API.
 *
 * @param {object} deckData - The data for the new deck.
 * @returns {Promise<object>} A promise containing the created deck.
 */
function addDeck(deckData) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify(deckData),
  }).then(processResponse);
}

/**
 * Deletes a deck from the API.
 *
 * @param {string} deckId - The unique identifier of the deck to delete.
 * @returns {Promise<object>} A promise containing the server response.
 */
function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}

export { getDecks, addDeck, deleteDeck };
const fetchedDecks = [];

/**
 * Retrieves a deck from the fetched decks array by its ID.
 *
 * @param {string} deckId - The unique identifier of the deck.
 * @returns {object|undefined} The matching deck, or undefined if it is not found.
 */
function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}

/**
 * Removes a deck from the fetched decks array by its ID.
 *
 * @param {string} deckId - The unique identifier of the deck to remove.
 * @returns {void}
 */
function removeDeckByID(deckId) {
  const deckIndex = fetchedDecks.findIndex(
    (deck) => deck._id === deckId
  );

  if (deckIndex !== -1) {
    fetchedDecks.splice(deckIndex, 1);
  }
}

export { fetchedDecks, getDeckByID, removeDeckByID };
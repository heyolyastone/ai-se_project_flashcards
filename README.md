# Flashcard App

A study application created as part of TripleTen's AI-Assisted Software Engineering program. Users can view flashcard decks, create new decks, delete existing decks, and practice cards in an interactive carousel.

## Features

* View flashcard decks loaded from a remote database
* Open individual decks and review their cards
* Practice cards in an interactive carousel
* Flip cards to switch between questions and answers
* Navigate between cards
* Create new decks using JSON data
* Choose a color for a new deck
* Delete decks
* Preserve created and deleted decks after the page is refreshed
* Display server and form validation errors in a modal
* Navigate between My Decks, New Deck, About, deck, carousel, and 404 views
* Responsive layout based on the project design

## API Integration

The application communicates with a remote API to:

* Fetch existing decks
* Add new decks
* Delete decks

Because deck changes are stored in a remote database, they remain available after the page is refreshed.

## Error Handling

The application validates the New Deck form before sending data to the server.

Error messages are displayed in a modal when:

* The JSON syntax is invalid
* The deck name is invalid
* The cards property is missing or is not an array
* The selected color does not match the color in the JSON
* A server request fails

## Code Documentation

Named JavaScript functions are documented using JSDoc, including:

* Function descriptions
* Parameter names and types
* Return types

## Technologies Used

* HTML
* CSS
* JavaScript
* Fetch API
* REST API
* Git and GitHub
* GitHub Pages
* BEM methodology
* JSDoc

## Deployed Site

Check out [the deployed Flashcard App](https://heyolyastone.github.io/ai-se_project_flashcards/) on GitHub Pages.

## Project Pitch Video

Check out [the project pitch video](https://www.loom.com/share/f9b402ecff7b45e2aed2c55c1c5825ac), where I describe the project and some challenges I faced while building it.

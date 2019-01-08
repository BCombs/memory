/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const cardDeck = document.querySelectorAll(".card");
let openCards = [];

// Displays a card
function displayCard(card) {
  card.classList.add('open', 'show');
}

// Adds the card to an array of opened cards
function addToOpenList(card) {
  openCards.push(card);
}

// Checks if two cards match
function checkForMatch() {
  cardOne = openCards[0].children[0].classList;
  cardTwo = openCards[1].children[0].classList;
  if (cardOne.length !== cardTwo.length) {
    return false;
  }
  for (let i = 0; i < cardOne.length; i++) {
    if (cardOne[i] !== cardTwo[i]) return false;
  }
  return true;
}

// If the cards match, this function locks them open
function matchCards() {
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  openCards = [];
}

// If the cards do not match, clear openCards and hide them
function removeCards() {
  setTimeout(function() {
    openCards.forEach(function(card) {
      card.classList.remove('open', 'show');
    });
    openCards = [];
  }, 1000);
}

// Add a click listener to each card
cardDeck.forEach(function(card) {
  card.addEventListener('click', function(e) {
    // If the card does not contain the classes open, show, or match; display it.
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      displayCard(card);
      addToOpenList(card);
      if (openCards.length == 2) {
        if (checkForMatch()) {
          matchCards();
        } else {
          removeCards();
        }
      }
    }
  });
});
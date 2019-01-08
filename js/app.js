/*
 * Create a list that holds all of your cards
 */

cards = ['fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
];

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

let openCards = [];
let numMoves = 0;
let numMatches = 0;
const modal = document.querySelector('.modal');

function addCardItem(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
}

function addStarItem() {
  return `<li><i class="fa fa-star"></i></li>`;
}

function initGame() {
  numMoves = 0;
  numMatches = 0;
  modal.style.display = 'none';

  shuffledCards = shuffle(cards);
  // Get a new array with addCardItem called on each element in cards array (map)
  const cardHTML = shuffledCards.map(function(card) {
    return addCardItem(card);
  });
  const deck = document.querySelector('.deck');
  deck.innerHTML = cardHTML.join('');
  addListeners();
  addStars();
  updateMoves();
}

initGame();

// Displays a card
function displayCard(card) {
  card.classList.add('open', 'show');
}

// Adds the card to an array of opened cards
function addToOpenList(card) {
  openCards.push(card);
}

function gameWin() {
  // Get the game details
  const starRating = document.querySelector('.stars').children.length;
  const gameDetails = `You won the game in ${numMoves} moves and finished the game with a star rating of ${starRating}! Good Job!`;
  const detailsMessage = document.getElementById('game-details');
  detailsMessage.innerText = gameDetails;
  modal.style.display = 'block';
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
  numMatches++;
  if (numMatches == 8) {
    gameWin();
  }
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

// Update the moves counter on the screen
function updateMoves() {
  document.getElementById("moves").textContent = numMoves;
}

// Removes a star
function removeStar() {
  const starUl = document.querySelector('.stars');
  starUl.removeChild(starUl.children[0]);
}

// Reset the number of stars to 3
function addStars() {
  const starUl = document.querySelector('.stars');
  let starHTML = [];
  for (let i = 0; i < 3; i++) {
    starHTML.push(addStarItem());
  }
  starUl.innerHTML = starHTML.join('');
}

// Add click listeners to the cards
function addListeners() {
  // Get all of the cards
  const cardsInDeck = document.querySelectorAll('.card');
  // Add a click listener to each card
  cardsInDeck.forEach(function(card) {
    card.addEventListener('click', function(e) {
      // If the card does not contain the classes open, show, or match; display it.
      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
        displayCard(card);
        addToOpenList(card);
        if (openCards.length == 2) {
          // Increase the number of moves by 1 and update
          numMoves++;
          updateMoves();

          // Check if we need to lower player star rating
          if (numMoves == 15 || numMoves == 22) {
            // Remove a star
            removeStar();
          }

          if (checkForMatch()) {
            matchCards();
          } else {
            removeCards();
          }
        }
      }
    });
  });
}

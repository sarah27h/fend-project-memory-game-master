/*
 * Create a list that holds all of your cards
 */
const cardsDeck = document.querySelector('.deck');
// const cards = cardsDeck.children;
// console.log(cards);

const cards = document.querySelectorAll('.card');
console.log(cards);

const restartBtn = document.querySelector('.restart');
const replayBtn = document.querySelector('.replayBtn');

// moveConuter variable to calculate player moves
let moveConuter = document.querySelector('.moves');

const starRating = document.querySelector('.stars');

let timer;

// variable to keep track of player clicks
let clickCount = 0;

// list to hold 2 open cards to compare them
let openCardValue = [];
let openCardList = [];

// variable to keep track of num of matched cards
let match = 0;

// modal box
const modal = document.getElementById('conModal');

// closes the modal
const closeIcon = document.querySelector(".close");

let starNum = 3;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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

//function to open card and show symbol
function openCard(evt) {

  if (evt.target.nodeName.toLowerCase() === 'li') {

    // check if card is opended to fix second click problem
    //prevent opened card and match card to be clicked second time
    if (!(evt.target.classList.contains('open'))  && !(evt.target.classList.contains('match'))) {
      evt.target.classList.add('open', 'show');
      const card = evt.target;
      addOpenCards(card);
    }

    // counter to track first click to start timer
    // easytimer library from https://albert-gonzalez.github.io/easytimer.js/
    clickCount ++;
    if (clickCount === 1) {
      timer = new Timer();
      timer.start({precision: 'seconds'});
      timer.addEventListener('secondsUpdated', function (e) {
          $('#timeRecord .minutes').html(timer.getTimeValues().minutes);
          $('#timeRecord .seconds').html(timer.getTimeValues().seconds);
      });

    }
    console.log('clickCount ', clickCount);
    // console.log(evt.target);
    // console.log(openCardList);
  }

}


// function to add open card to list
function addOpenCards(card) {
  // get and save 2 card values to compare them
  const cardValue = card.lastElementChild.firstElementChild.className;

  // check if no of cards in the list and push cards if openCardList.length <= 1
  if (openCardList.length <= 1) {
    openCardValue.push(cardValue);
    openCardList.push(card);

    console.log(openCardList.length + ' inside addCard function');
    // check if there are 2 cards in openCardList and compare their values
    if (openCardList.length === 2 && (openCardValue[0] === openCardValue[1])) {
      console.log(openCardValue[0] + " " + openCardValue[1] + '.....' + openCardList[0]);
      cardsMatched(openCardList[0], openCardList[1]);

      countPlayerMoves();
      updateStar();

      // to keep track of matched cards
      match ++;
      if (match === 8) {
        winModel();
      }

      console.log(conuter);

      // remove cards and its values from openCardList
      openCardList.length = 0;
      openCardValue.length = 0;
    } else if (openCardList.length === 2 && (openCardValue[0] !== openCardValue[1])) {
      console.log(openCardValue[0] + " " + openCardValue[1]);
      cardsNotMatched(openCardList[0], openCardList[1]);
      countPlayerMoves();
      updateStar();
      console.log(conuter);

      // remove cards and its values from openCardList
      openCardList.length = 0;
      openCardValue.length = 0;
    }
  }
}

// function cardMatched add class match to 2 matched cards
function cardsMatched(card1, card2) {
  card1.classList.remove('open', 'show');
  card1.classList.add('match');
  card2.classList.remove('open', 'show');
  card2.classList.add('match');
}


// function cardsNotMatched hide card symbol and remove 2 cards from openCardList
function cardsNotMatched(card1, card2) {
  console.log("inside NotMatched fun")
  card1.classList.remove('show');
  card1.classList.remove('open');
  card2.classList.remove('show');
  card2.classList.remove('open');
}


// function to to count player moves
function countPlayerMoves() {
  conuter = Number(moveConuter.innerHTML);
  conuter ++;
  moveConuter.innerHTML = conuter;
  console.log('moves ' ,moveConuter.innerHTML);
}


// function to update star rating based on player Moves
function updateStar() {
  if ((moveConuter.innerHTML) === '15') {
    starNum = 2;
    starRating.children[0].style.cssText = 'visibility: hidden';
  } else if ((moveConuter.innerHTML) === '30') {
    starNum = 1;
    starRating.children[1].style.cssText = 'visibility: hidden';
  }
}


// function to show Congratulations Popup model when a user wins the game
function winModel() {
  console.log('congratulate  you win :)');
  // When the user clicks the button, open the modal
  timer.stop();

  modal.style.cssText = 'display: block';

  // get player data to display on win winModel
  const finalMoves = document.querySelector('.final-moves');
  finalMoves.innerHTML = moveConuter.innerHTML;
  const finalStars = document.querySelector('.final-stars');
  finalStars.innerHTML =  starNum.toString();
}


// function restartGame() to restart the game
function restartGame (){
  // reset game board (flip cards down, clear moveConuter, star rating, timer, clickCount, match)
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('open', 'show', 'match');
    console.log(cards[i]);
  }

  moveConuter.innerHTML = '0';
  console.log("I press restartBtn", starRating.children);

  const starchildren = starRating.children;
  for (let i = 0; i < starchildren.length; i++) {
    starchildren[i].style.cssText = 'visibility: visible';
  }

    timer.reset();
    timer.stop();
    document.querySelector('.minutes').innerHTML = '0';
    document.querySelector('.seconds').innerHTML = '0';
    console.log('seconds ', document.querySelector('.seconds').innerHTML);

    clickCount = 0;
    match = 0;
}


 // add click event to card
cardsDeck.addEventListener('click', openCard);


// add click event to restartBtn to restart game
restartBtn.addEventListener('click', restartGame);


// add click event to restartBtn to restart game
// and begin a new game
replayBtn.addEventListener('click', function() {
    modal.style.cssText = 'display: none';
    restartGame();
});


// add click event to icon to close the modal
closeIcon.addEventListener('click', function() {
    modal.style.cssText = 'display: none';
});


// add click event to window any click outside of the modal close it
window.addEventListener('click', function(evt) {
    if (evt.target == modal) {
        modal.style.cssText = 'display: none';
    }
});

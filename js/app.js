/*
 * Create a list that holds all of your cards
 */

var movesCounter = 0;
var findMatch = [];
var shuffledCards;
var cardListContainer = document.querySelector('.deck');
var cardList = ['<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card "><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>'
];
var restartGame = function() {
    cardListContainer.innerHTML = '';
    shuffledCards = shuffle(cardList);
    shuffledCards.forEach(function(value) {
        cardListContainer.innerHTML += value;
    })

}();
document.querySelector(".restart").addEventListener("click", function() {
    restartGame();
})




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

cardListContainer.childNodes.forEach(function(value) {
    value.addEventListener("click", ShowCard)
})

function ShowCard() {
    this.className += " open show";
    setTimeout(() => AddToList(this), 500)
}

function AddToList(element) {
    console.log(findMatch)
    findMatch.push(element)
    if (findMatch.length > 1) {
        if (findMatch[0].children[0].className === findMatch[1].children[0].className) {
            Matched()
        } else {
            notMached()
        }
        findMatch = [];
        increaseCounter()
    }
}

function Matched() {
    findMatch.forEach(function(value) {
        value.className = 'card match';
    })
}

function notMached() {
    findMatch.forEach(function(value) {
        value.className = 'card';
    })
}

function increaseCounter() {
    movesCounter++;
    document.querySelector(".moves").innerHTML = movesCounter;
}
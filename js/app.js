/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

var shuffledCards, restartGame, movesCounter = 0,
    starNum = 3,
    findMatch = [],
    matchedcards = [],
    selector = document.querySelectorAll('.stars li'),
    cardListContainer = document.querySelector('.deck');
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

//resrart function calling in the begining
(function restart() {
    shuffledCards = shuffle(cardList);
    shuffledCards.forEach(function(value) {
        cardListContainer.innerHTML += value;
    })
    cardListContainer.childNodes.forEach(function(value) {
        setTimeout(() => value.className += " open show", 500)
        setTimeout(() => value.className = "card", 3000)
        value.addEventListener("click", ShowCard)
    })
    restartGame = restart;
})();

//calling restart function when clicking on restart button to reset the game
document.querySelectorAll(".restart, .playAgain").forEach(function(element) {
    element.addEventListener("click", function() {
        cardListContainer.innerHTML = '';
        matchedcards = [];
        resetCounter();
        restartGame();
    })
})

function ShowCard() {
    this.className += " open show";
    setTimeout(() => AddToList(this), 1000)
    this.removeEventListener("click", ShowCard)
}

function AddToList(element) {
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
        value.removeEventListener("click", ShowCard)
        matchedcards.push(value)
        if (matchedcards.length == 16) {
            console.log("Finish")
            document.querySelector(".starsNum").innerHTML = starNum;
            document.querySelector(".winMessage").style.display = "block";
        }
    })
}

function notMached() {
    findMatch.forEach(function(value) {
        value.className += ' notmatch';
        setTimeout(() => value.className = 'card show', 500)
        setTimeout(() => value.className = 'card', 1000)
        value.addEventListener("click", ShowCard)
    })
}

function increaseCounter() {
    movesCounter++;
    writeMoves(movesCounter)
    if (movesCounter == 10) {
        selector[0].firstChild.className = "fa fa-star-o";
        starNum--;
    }
    if (movesCounter == 15) {
        selector[1].firstChild.className = "fa fa-star-o";
        starNum--;
    }
    if (movesCounter == 20) {
        selector[2].firstChild.className = "fa fa-star-o";
        starNum--;
    }
}

function resetCounter() {
    movesCounter = 0;
    writeMoves(movesCounter)
    selector.forEach(function(element) {
        element.firstChild.className = "fa fa-star";
    })
    starNum = 3;
    document.querySelector(".winMessage").style.display = "none";
}

function writeMoves(counter) {
    document.querySelectorAll(".moves").forEach(function(value) {
        value.innerHTML = counter;
    })
}
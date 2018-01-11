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

var shuffledCards, restartGame, movesCounter, starNum = 3,
    findMatch = [],
    matchedcards = [];
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
/*
['<li class="card"><div><i class="fa fa-diamond"></i></div></li>',
    '<li class="card"><div><i class="fa fa-paper-plane-o"></i></div></li>',
    '<li class="card "><div><i class="fa fa-anchor"></i></div></li>',
    '<li class="card"><div><i class="fa fa-bolt"></i></div></li>',
    '<li class="card"><div><i class="fa fa-cube"></i></div></li>',
    '<li class="card"><div><i class="fa fa-anchor"></i></div></li>',
    '<li class="card"><div><i class="fa fa-leaf"></i></div></li>',
    '<li class="card"><div><i class="fa fa-bicycle"></i></div></li>',
    '<li class="card"><div><i class="fa fa-diamond"></i></div></li>',
    '<li class="card"><div><i class="fa fa-bomb"></i></div></li>',
    '<li class="card"><div><i class="fa fa-leaf"></i></div></li>',
    '<li class="card"><div><i class="fa fa-bomb"></i></div></li>',
    '<li class="card"><div><i class="fa fa-bolt"></i></div></li>',
    '<li class="card"><div><i class="fa fa-bicycle"></i></div></li>',
    '<li class="card"><div><i class="fa fa-paper-plane-o"></i></div></li>',
    '<li class="card"><div><i class="fa fa-cube"></i></div></li>'
];*/
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

(function restart() {
    resetCounter();
    matchedcards = [];
    cardListContainer.innerHTML = '';
    shuffledCards = shuffle(cardList);
    shuffledCards.forEach(function(value) {
        cardListContainer.innerHTML += value;
    })
    cardListContainer.childNodes.forEach(function(value) {
        // setTimeout(() => value.className += " open show", 500)
        value.addEventListener("click", ShowCard)
    })

    restartGame = restart;

})();

document.querySelector(".restart").addEventListener("click", function() {
    restartGame();
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
        value.className = 'card';
        value.addEventListener("click", ShowCard)
    })
}

function increaseCounter() {
    movesCounter++;
    document.querySelectorAll(".moves").forEach(function(value) {
        value.innerHTML = movesCounter;
    })
    if (movesCounter == 10) {
        document.querySelector(".stars").className += ' whiteStar';
        starNum--;
    }
    if (movesCounter == 15) {
        document.querySelector(".stars").className += ' whiteStar2';
        starNum--;
    }
    if (movesCounter == 20) {
        document.querySelector(".stars").className += ' whiteStar3';
        starNum--;
    }
}

function resetCounter() {
    movesCounter = 0;
    document.querySelectorAll(".moves").forEach(function(value) {
        value.innerHTML = movesCounter;
    })
    document.querySelector(".stars").className = "stars";
    starNum = 3;
    document.querySelector(".winMessage").style.display = "none";
}
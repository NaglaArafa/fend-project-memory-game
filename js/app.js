var shuffledCards, restartGame, timer, movesCounter = 0,
    starNum = 3,
    firstClick = true,
    findMatch = [],
    matchedcards = [],
    starList = document.querySelectorAll('.stars li'),
    cardListContainer = document.querySelector('.deck');

//Array of cards
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
//shuffle the list of cards
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
    //caling shuffle function to shuffle to list of cards and save the new list in "shuffledCards" variable
    shuffledCards = shuffle(cardList);
    //loop over the shuffled list and add each card's HTML to the page
    shuffledCards.forEach(function(value) {
        cardListContainer.innerHTML += value;
    })

    /*this function to show th whole cards at the begining for 3 seconds and hide them after that 
     so that the user could see them once and then guess where is the matched cards like any online memory game,
     also ecucute the function "showCard" when the user click on any card*/
    cardListContainer.childNodes.forEach(function(value) {
        setTimeout(() => value.className += " open show", 500)
        setTimeout(() => value.className = "card", 3000)
        value.addEventListener("click", ShowCard)
    })
    restartGame = restart;
})(); // self excution function to be called at the begining

/* when calling restart button or play again after wining a game, this function will reset
 all values to be start from the begining */
document.querySelectorAll(".restart, .playAgain").forEach(function(element) {
    element.addEventListener("click", function() {
        cardListContainer.innerHTML = '';
        matchedcards = [];
        resetCounter();
        restartGame();
    })
})

/*this will be excuted when the user click on any card, the card will flib and will call
 the function "AddToList" with this card, also remove the click event from this card
 to prevent the user from clicking to the same card and match it with itself */
function ShowCard() {
    if (firstClick) {
        firstClick = false;
        startTimer();
    }
    this.className += " open show";
    setTimeout(() => AddToList(this), 1000)
    this.removeEventListener("click", ShowCard)
}

/* after showing the card, i will add this card to a list if the list already has another card
by checking on the length of this list, then i will check if these two cards are matched or not,
 if true i will call "Matched", if false i will call "notMached".
 in all cases i will clear the list to be able to match another 2 cards also call "increaseCounter" function*/
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

/* this function will be excuted when 2 cards matched, this will add class "match" to boyh cards,
 and remove the click event from these cards. push these cards to "matchedcards" array and check to its length
 to be able to know when the user finish the game */

/* after finishing the game, show the wining meaage and set the number of remaining starts */
function Matched() {
    findMatch.forEach(function(value) {
        value.className = 'card match';
        value.removeEventListener("click", ShowCard)
        matchedcards.push(value)
        if (matchedcards.length == 16) {
            document.querySelector(".starsNum").innerHTML = starNum;
            document.querySelector(".winMessage").style.display = "block";
            clearInterval(timer);
        }
    })
}

/* this function will be excuted when the cards not matched, add class not matched which i used in css for animation
 then remove it  and add the click event handler again to card*/
function notMached() {
    findMatch.forEach(function(value) {
        value.className += ' notmatch';
        setTimeout(() => value.className = 'card show', 500)
        setTimeout(() => value.className = 'card', 1000)
        value.addEventListener("click", ShowCard)
    })
}

/*calling this function after matching 2 cards, to track number of moves,then write this number
 in the html page by calling "writeMoves" function, then i saved the list items of stars in a list
 called "starList" when the "movesCounter" reched my condition numbers then change the class name of the first 
star then the second then the third to be empty, also decrese the "starNum" variable value */
function increaseCounter() {
    movesCounter++;
    writeMoves(movesCounter)
    if (movesCounter == 10) {
        starList[0].firstChild.className = "fa fa-star-o";
        starNum--;
    }
    if (movesCounter == 15) {
        starList[1].firstChild.className = "fa fa-star-o";
        starNum--;
    }
}

/*this function called to reset out counter when starting new game like moves counter,
 also retern the starts to be 3 again and hide the wining message */
function resetCounter() {
    resetTimer()
    movesCounter = 0;
    writeMoves(movesCounter)
    starList.forEach(function(element) {
        element.firstChild.className = "fa fa-star";
    })
    starNum = 3;
    document.querySelector(".winMessage").style.display = "none";
}

/* set the counter value in html with the value in js*/
function writeMoves(counter) {
    document.querySelectorAll(".moves").forEach(function(value) {
        value.innerHTML = counter;
    })
}

function startTimer() {
    var sec = 0;

    function pad(val) { return val > 9 ? val : "0" + val; }
    timer = setInterval(function() {
        var snd = pad(++sec % 60)
        document.querySelectorAll("#seconds").forEach(function(value) {
            value.innerHTML = snd;
        })
        document.querySelectorAll("#minutes").forEach(function(value) {
            value.innerHTML = pad(parseInt(sec / 60, 10));
        })
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    firstClick = true;
    document.querySelectorAll("#seconds").forEach(function(value) {
        value.innerHTML = "00";
    })
    document.querySelectorAll("#minutes").forEach(function(value) {
        value.innerHTML = "00";
    })
}
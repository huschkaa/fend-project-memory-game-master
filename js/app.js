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

//Create array of 16 cards
let cardArray = $('.card');
let moves = 0; /* variable for tracking number of moves made */

// Shuffle the 16 cards using function provided, create HTML, and add to the page
shuffle(cardArray);
$('.deck').append(cardArray);

//Function to show cards as they are clicked
function cardClickHandler(event) {
  $(this).attr('class','open card show click');
  let cardcount = $('ul').find('.click').length;

//Array to check class of cards that are open once two are picked and turn them a color
  if (cardcount == 2) {
    let openClass = $('.click').find('i');
    let classone = openClass[0].className;
    let classtwo = openClass[1].className;

//increment the moves variable and update the count in html
    moves++;
    document.getElementById("moves").innerHTML = moves;

//Remove one star after 11 moves, but before 16 moves
    if (moves > 13 && moves < 19) {
      $('.stars').find('#twostar').attr('class','star');
      }

//Remove two stars after 15 moves
    if (moves >= 19) {
      $('.stars').find('#twostar').attr('class','star');
      $('.stars').find('#onestar').attr('class','star');
    }

//If function when the two cards are a match
    if (classone == classtwo){
        $('.click').attr('class','open card show match');
        $('.match').off('click');
        if (($('.match').length)==16) {
        modalfire ();
        }
        return moves;
    }

//Else function if the cards do not match
    else {
        $('.click').attr('class','open card show miss click');
          setTimeout(function(){ $('.click').attr('class','card'); }, 999);
          return moves;
    }
  }
}

$('.card').on('click', cardClickHandler);
$('.card').on('click', Timer);

//Timer to display at start of game
let timerVar;
function Timer(event) {
  timerVar = setInterval(countTimer, 1000);
  let totalSeconds = 0;
  $('.card').off('click', Timer);
  function countTimer() {
     ++totalSeconds;
     let minute = Math.floor(totalSeconds/60);
     let seconds = totalSeconds - (minute*60);
     let time = minute + ":" + seconds;
     document.getElementById("timer").innerHTML = time;

  };
}

//function when restart is clicked to shuffle board, restart clock, moves, and stars
$('.restart').on('click', function () {
  moves = 0;
  totalSeconds = 0;
  document.getElementById("moves").innerHTML = 0;
  $('.stars').find('i').attr('class','fa fa-star');
  $('.card').attr('class','card');
  shuffle(cardArray);
  $('.deck').append(cardArray);
  return moves;
});

//Function to track moves, time, and stars once game is Won and pop up
function modalfire() {
  document.getElementById("popup").innerHTML = "With " + moves + " moves, and " + $('.fa-star').length + " stars, and a time of " + document.getElementById("timer").innerHTML;
  clearInterval(timerVar);
  let mpopup = document.getElementById('mpopupBox');
  let close = document.getElementsByClassName("close")[0];
  mpopup.style.display = "block";

  close.onclick = function() {
      mpopup.style.display = "none";
  };
}

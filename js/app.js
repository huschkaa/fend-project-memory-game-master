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
  $(this).attr('class','open card show click'); /* Card shows open when clicked */
  let cardcount = $('ul').find('.click').length; /*Keep count of cards that have been clicked*/

//Array to check class of cards that are open once two are picked and turn them a color
  if (cardcount == 2) {
    $('.card').off('click', cardClickHandler); /*this ensures that only two cards can be seen*/
//Setup array and specific class for each card selected to see if they match
    let openClass = $('.click').find('i');
    let classone = openClass[0].className;
    let classtwo = openClass[1].className;

//increment the moves variable and update the count in html so user can see the moves as they happen
    moves++;
    document.getElementById("moves").innerHTML = moves;

//Remove one star after 13 moves, but before 19 moves
    if (moves > 13 && moves < 19) {
      $('.stars').find('#twostar').attr('class','star');
      }

    //Remove two stars after 19 moves
    if (moves >= 19) {
      $('.stars').find('#twostar').attr('class','star');
      $('.stars').find('#onestar').attr('class','star');
    }

    //If function when the two cards are a match
    if (classone == classtwo){
        $('.click').attr('class','open card show match'); /*new class to show the card green if it matches*/
        $('.card').on('click', cardClickHandler); /*turn the click handler back on so new cards can be selected*/
        $('.match').off('click', cardClickHandler); /*turn click handler off for cards that have the class match so they aren't selected*/

          //If statement to fire the modal when 16 cards have been matched
          if (($('.match').length)==16) {
            modalfire ();
          }
        return moves;
    }

//Else function if the cards do not match
    else {
        $('.click').attr('class','open card show miss click'); /*show the cards as red cards*/

        //function to have the cards turn back over in just under 1 second.
        setTimeout(function() {
            $('.click').attr('class','card'); /*change the class back to a card to flip it back over*/
            $('.card').on('click', cardClickHandler);/*turn the click handler back on so new cards can be selected*/
              $('.match').off('click', cardClickHandler); /*ensure matched cards still aren't able to be selected after a miss*/
          }, 999);
          return moves;
    }
  }
}

$('.card').on('click', cardClickHandler); /*setting up the click handler when cards are clicked*/
$('.card').on('click', Timer); /*setting up the click handler when the first card is clicked for the timer to start*/

//Timer to display at start of game
let timerVar; /*setting up global variable so it can be called later*/
function Timer(event) {
  timerVar = setInterval(countTimer, 1000); /*ensures that counttimer is run every 1 second*/
  let totalSeconds = 0;
  $('.card').off('click', Timer); /*turn of the click event so that the second time a card is clicked the clock doesn't start again*/

  //Function to setup time in minutes and seconds to complete the game and update in HTML
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
  //Restart the timer
  $('.card').on('click', Timer);    /*turn click event on so timer will start when card is clicked*/
  clearInterval(timerVar);          /*ensure clock stops running by clearing this variable*/
  document.getElementById("timer").innerHTML = ""; /*set html to blank value*/
  //Clear and reset to 3 stars
  $('.stars').find('i').attr('class','fa fa-star');
  //Shuffle the deck to ensure the board is a new layout - copied from above
  $('.card').attr('class','card');
  shuffle(cardArray);
  $('.deck').append(cardArray);
  //Clear the moves and set back to 0
  moves = 0;
  document.getElementById("moves").innerHTML = 0;
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

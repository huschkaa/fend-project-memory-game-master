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

// Shuffle the 16 cards using function provided, create HTML, and add to the page
shuffle(cardArray);
$('.deck').append(cardArray);

//Function to show cards as they are clicked
function cardClickHandler(event) {
  $(this).attr('class','open card show click');
  let cardcount = $('ul').find('.click').length;

  console.log(cardcount);
//Array to check class of cards that are open once two are picked and turn them a color
  if (cardcount == 2) {
    let openClass = $('.click').find('i');
    let classone = openClass[0].className;
    let classtwo = openClass[1].className;
    console.log(classone);
    console.log(classtwo);

    if (classone == classtwo){
        $('.click').attr('class','open card show match');
    }
    else {
        $('.click').attr('class','open card show miss click');
        setTimeout(function(){
          $('.click').attr('class','card');
        }, 999);
    }
  };
};
$('.card').on('click', cardClickHandler);


//Add card to list of open cards when clicked


//If two cards are clicked check to see if they match








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

 $('#my-button').on('click',function() {
     $('#my-button').remove();
     $('body').attr('class','success');
 });


//Timer to display time once first card is clicked
$('.card').on('click',function() {
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
   ++totalSeconds;
   var minute = Math.floor(totalSeconds/60);
   var seconds = totalSeconds - (minute*60);

   document.getElementById("timer").innerHTML = minute + ":" + seconds;
}
});

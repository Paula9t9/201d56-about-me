'use strict';

var currentQuestion=0;
var score = 0;
var failScore = 0;
var dexPokemon = '365';
var yesArray = ['yes', 'yeah', 'yup', 'yea', 'yep', 'y'];
var noArray = ['no','nope','nuh-uh','n'];
var platformArray = ['xbox one', 'xbox', 'playstation', 'playstation portable', 'psp', '3ds', 'gameboy', 'gameboy color', 'phone', 'mobile', 'sega', 'sega genesis', 'pc', 'computer', 'switch', 'nintendo switch'];
var correctReplyArray = [
  'Correct!',
  'Another one right!',
  'Yup! You\'re on a roll!',
  'Bum bum bum... Another one bites the dust. You got it!',
  'Correctomundo',
  'I believe the technical term for what you\'re doing is: \'Winning\'',
  'Are you cheating? I think you might be cheating.',
  'Holy cow! Your perfect record remains intact!' ];
var failReplyArray = [
  'Oops, wrong answer.',
  'Ouchie, another one wrong.',
  'Uh oh, wrong answer. You\'re building a small pile of those...',
  'Wrong answer. Be careful, you\'re starting to make a habit of this.',
  'Incorrect. This is starting to hurt my feels.',
  'Are you picking the wrong answers on purpose?',
  'I have good news, and I have bad news. The good news is, your \'perfect\' score is intact! You don\'t need to hear the bad news...'];

var questionArray = [
  'Question #1: \n Do I play video games?',
  'Next question: Do I play Fortnite?',
  'Here\'s an easy one: \nDo I like to code?',
  'Do I have a cat?',
  'Do I play CandyCrush?',
  'According to my Pokemon Go Pokedex, how many Pokemon have I caught?',
  'What gaming platform do I own? \n(Anything you can play a game on. For example: PS4.'
]

var answerArray = [
  true,
  false,
  true,
  true,
  true,
  dexPokemon,
  platformArray
]
function askQuestion(i){
 var response = prompt(questionArray[i]);
 console.log('question was asked');
 console.log(questionArray[i]);
 return response;
} 
alert('Before we get into the serious stuff, let\'s play with some random trivia about me.');

//this function will take an array index, which will pass that to a question array to display the question

//funcition will get the user response and reply accordingly
var userName = prompt('But first, what\'s your name?');

//Used the book to remember the exact switch syntax
// I didn't want to repeat code, but luckily I found this: https://stackoverflow.com/questions/13207927/switch-statement-multiple-cases-in-javascript

switch (userName.toLowerCase()) {

case 'paula':
  alert('That\'s my name too!');
  break;

case 'sam':
case 'michelle':
case 'nicholas':
case 'brian':
case 'brook':
  alert('Hello, teacher!');
  break;


case 'lena':
case 'david':
case 'ashabrai':
case 'evan':
case 'dana':
  alert('Hello helpful TA person!');
  break;

default:
  alert('Welcome, ' + userName +'!');
  break;
}

for(var i=0; i<questionArray.length -2;i++){
  var answer = askQuestion(currentQuestion);
  var tOF = checkAnswer(answer); 
  reply(tOF);
}


var dexAttempts = 0;
var platAttempts = 0;
var isGuessRight=false;

while(isGuessRight === false && dexAttempts < 4){ 
  var loopAnswer=askQuestion(currentQuestion);
  var tempAnswer=checkAnswer(loopAnswer);
  currentQuestion--;
  reply(isGuessRight);
  dexAttempts++;
  if(answerArray[currentQuestion]===tempAnswer){
    isGuessRight=true;
  }
}

// if(answer6 === dexPokemon){
//   alert(correctReplyArray[score]);
//   score++;
// } else {
//   alert('Sorry, you ran out of attempts. No points for you.');
//   failScore++;
// }



// do{
//   var answer7 = prompt();
//   platAttempts++;
// } while (!platformArray.includes(answer7.toLowerCase()) &&
//   platAttempts < 6);

//Used this page to figure out how to print array:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
var allPlats = platformArray.join(',\n');

if(platformArray.includes(answer7.toLowerCase())){
  alert(correctReplyArray[score] + '\n\nHere are all of the possible answers:\n' +
  allPlats);
  score++;
} else {
  alert('Sorry, you ran out of attempts. We\'ll put that down as a \'Not Correct.\'\n\nHere are the possible \'correct\' answers:\n' + allPlats);
  failScore++;
}


switch (score) {

case 5:
  alert(userName + ', do I know you? Because You got all ' + score + ' questions correct.');
  break;

case 1:
  alert(userName + ', the scores are in, and you got ' + score + ' question correct! \n... \nDon\'t worry, it\'s better than nothing.');
  break;

case 0:
  alert('You know, ' + userName + ', scores don\'t matter here. After all, you\'re here to get to know me. It would be weird if you knew all the answers.');
  break;

default:
  alert('Great job, ' + userName + '! You got ' + score + ' questions correct!');
  break;
}


// Didn't end up going this route, but used the example to remember how to write a function in js: https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements

function checkAnswer(answer) {

  // Tried to use .contains (Java habits), but after getting an error I used this to fix it: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  if(yesArray.includes(answer.toLowerCase())){
    console.log('Input equates to: ' + true);
    return true;
  } else if (noArray.includes(answer.toLowerCase())){
    console.log('Input equates to: ' + false);
    return false;
  } else {
    console.log('Unrecognized Input');
    return answer;
  }
  
}

function reply(correctness){

  if(correctness === answerArray[currentQuestion]){
    alert(correctReplyArray[score]);
    score++;
  } else {
    alert(failReplyArray[failScore]);
    failScore++;
  }
  currentQuestion++;
}

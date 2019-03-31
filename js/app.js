'use strict';

var currentQuestion=0;
var score = 0;
var failScore = 0;

//Keeping it here because used in both askQuestion() and playTrivia()
var questionArray = [
  'Question #1: \n Do I play video games?',
  'Next question: Do I play Fortnite?',
  'Here\'s an easy one: \nDo I like to code?',
  'Do I have a cat?',
  'Do I play CandyCrush?',
  'According to my Pokemon Go Pokedex, how many Pokemon have I caught?',
  'What gaming platform do I own? \n(Anything you can play a game on. For example: PS4.'
];
//Keeping it here because used in both checkAnswer() and displayCorrectAnswer()
var dexPokemon = '365';
var platformArray = ['xbox one', 'xbox', 'playstation', 'playstation portable', 'psp', '3ds', 'gameboy', 'gameboy color', 'phone', 'mobile', 'sega', 'sega genesis', 'pc', 'computer', 'switch', 'nintendo switch'];
var answerArray = [
  true,
  false,
  true,
  true,
  true,
  dexPokemon,
  platformArray
];

function playTriviaGame() {

  alert('Before we get into the serious stuff, let\'s play with some random trivia about me.');

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

  for(var i=0; i<questionArray.length-2;i++){
    var answer = askQuestion(currentQuestion);
    var tOF = checkAnswer(parseAnswer(answer));
    reply(tOF);
  }

  for(i=0; i<questionArray.length-5;i++){
    loopQuestion();
  }

  displayCorrectAnswer();

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

}

//This function will pose a question to the user based on the provided question #. ie Question #1, 2, etc,...
function askQuestion(i){

  var response = prompt(questionArray[i]);
  return response;
}

// Didn't end up going this route, but used the example to remember how to write a function in js: https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements
//  Tried to use .contains (Java habits), but after getting an error I used this to fix it: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

//parseAnswer() checks the answers against the Y/N arrays and returns if the input equate to true (yes) of false (no). Otherwise, it returns the answer so it can be checked by other functions.
function parseAnswer(answer) {
  var yesArray = ['yes', 'yeah', 'yup', 'yea', 'yep', 'y'];
  var noArray = ['no','nope','nuh-uh','n'];

  if(yesArray.includes(answer.toLowerCase())){
    return true;
  } else if (noArray.includes(answer.toLowerCase())){
    return false;
  } else {
    console.log('Unrecognized Input');
    return answer;
  }

}

//Checks the answer against the answer array. Separate from reply so that loops can check value before replying.
function checkAnswer(answer) {
  console.log('checking answer for question: ' + currentQuestion);
  var rightAnswer = answerArray[currentQuestion];
  if(answer === rightAnswer){
    return true;
  }else if(Array.isArray(rightAnswer)){
    if(rightAnswer.includes(answer)){
      return true;
    }
  } else {
    return false;
  }
}

//Replies to the user based on whether their answer was correct or not.
function reply(correctness){
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

  var replyScore = score;
  var failReplyScore = failScore;

  if(replyScore >= correctReplyArray.length){
    replyScore = 0;
  }else if (failReplyScore >= failReplyArray.length){
    failReplyScore = 0;
  }

  if(correctness){
    alert(correctReplyArray[replyScore]);
    score++;
  } else {
    alert(failReplyArray[failReplyScore]);
    failScore++;
  }
  currentQuestion++;
}

function loopQuestion() {
  var attempts = 0;
  var isGuessRight=false;

  while(isGuessRight === false && attempts < 4){
    var loopAnswer=askQuestion(currentQuestion);
    var tempAnswer=parseAnswer(loopAnswer);

    if(checkAnswer(tempAnswer)){
      console.log('Correct loop answer');
      isGuessRight=true;
      //reset to 0 because it will be used in next loop.
      attempts=0;
      reply(true);
      continue;
    }
    //reply advances the currentQuestion. Must reset before checking against answer array.
    currentQuestion--;
    reply(isGuessRight);
    attempts++;
    console.log('Wrong answer. Current attempts: ' + attempts);
  }
  if(!isGuessRight){
    currentQuestion++;
  }

}

function displayCorrectAnswer() {
  //subtracting one because when called, Right/Wrong reply has already been made, which incremements the question. Reply is always called, display is not always called.
  var correctAnswer = answerArray[currentQuestion-1];
  if(Array.isArray(correctAnswer)){
    //Used this page to figure out how to print array:
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
    var listString = correctAnswer.join('\n');
    alert( 'Here are the correct answers:\n' + listString);
  }else {
    alert('Here is the correct answer: ' + correctAnswer);
  }
}

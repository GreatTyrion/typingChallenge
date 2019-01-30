var btnColour = ["green", "red", "blue", "yellow"];
var letterLib = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
  "V", "W", "X", "Y", "Z"
];
var flag = false;
var inputLetterArray = [];
var start = true;
var step = 0;
var letterArray = [];
var colourArray = [];
var startGameTime = 0;
var level = 0;

function removeElement(arrOriginal, elementToRemove) {
    return arrOriginal.filter(function(el) {return el !== elementToRemove;});
}

function playBtnSound(colour) {
  var btnSound =  new Audio(colour + ".mp3");
  btnSound.play();
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function showButton(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 200);
}

function creatRandomArray(list) {
  var randomArray1 = [];
  for (i=0; i<4; i++) {
    var listLength = list.length;
    var randomIndex = Math.floor(Math.random() * listLength);
    randomArray1.push(list[randomIndex]);
    list = removeElement(list, list[randomIndex]);
  }
  return randomArray1;
}

function createClockwiseColour(list) {
  var randomArray2 = [];
  var startIndex = Math.floor(Math.random() * list.length);
  var startArray = list.slice(startIndex, list.length);
  for (i=0; i<list.slice(0, startIndex).length; i++) {
    startArray.push(list[i]);
  }
  return startArray;
}

function gameOver() {
  playBtnSound("wrong");
  $("#level-title").text("Timeout or Wrong Input, Press A Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  flag = false;
  step = 0;
  level = 0;
}

function startGame() {
  colourArray = createClockwiseColour(btnColour);
  letterArray = creatRandomArray(letterLib);

  for (i=0; i<4; i++){
    $("#" + colourArray[i]).text(letterArray[i]);
  }
  playBtnSound(colourArray[0]);
  showButton(colourArray[0]);
  $("#level-title").text("Level " + (level+=1));
  flag = true;
  start = true;
  startGameTime = new Date().getTime();
}


$(document).keypress(function(event) {

  if (!flag) {
    startGame();
  }

  if (new Date().getTime() - startGameTime > 5000) {
    gameOver();
  }

  console.log(event.key);
  if (flag && !start) {
    var letter = event.key.toUpperCase();
    if (letter !== letterArray[step++]) {
      gameOver();
    }
    else if (step<4) {
      playBtnSound(colourArray[step-1]);
      showButton(colourArray[step-1]);
    }
  }

  if (flag && step===4) {
    flag = false;
    step = 0;
    sleep(1000);
    startGame();
  }

  start = false;
});

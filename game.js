var btnColour=["green","red","blue","yellow"];var letterLib=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];var flag=!1;var inputLetterArray=[];var start=!0;var step=0;var letterArray=[];var colourArray=[];var startGameTime=0;var level=0;function removeElement(arrOriginal,elementToRemove){return arrOriginal.filter(function(el){return el!==elementToRemove})}
function playBtnSound(colour){var btnSound=new Audio(colour+".mp3");btnSound.play()}
function showButton(colour){$("#"+colour).addClass("pressed");setTimeout(function(){$("#"+colour).removeClass("pressed")},300)}
function creatRandomArray(list){var randomArray1=[];for(i=0;i<4;i++){var listLength=list.length;var randomIndex=Math.floor(Math.random()*listLength);randomArray1.push(list[randomIndex]);list=removeElement(list,list[randomIndex])}
return randomArray1}
function createClockwiseColour(list){var randomArray2=[];var startIndex=Math.floor(Math.random()*list.length);var startArray=list.slice(startIndex,list.length);for(i=0;i<list.slice(0,startIndex).length;i++){startArray.push(list[i])}
return startArray}
function gameOver(key){playBtnSound("wrong");if(key.toUpperCase()===letterArray[step]){$("#level-title").text("Timeout, Press A Key to Restart")}
else{$("#level-title").text("Wrong Input, Press A Key to Restart")}
$("body").addClass("game-over");setTimeout(function(){$("body").removeClass("game-over")},200);flag=!1;step=0;level=0}
function startGame(){colourArray=createClockwiseColour(btnColour);letterArray=creatRandomArray(letterLib);for(i=0;i<4;i++){$("#"+colourArray[i]).text(letterArray[i])}
playBtnSound(colourArray[0]);showButton(colourArray[0]);setTimeout(function(){for(i=0;i<4;i++){$("#"+colourArray[i]).text("")}},1500);$("#level-title").text("Level "+(level+=1));flag=!0;startGameTime=new Date().getTime()}
function compareLetter(key){var letter=key.toUpperCase();if(letter!==letterArray[step++]){gameOver(key)}
else if(step<4){playBtnSound(colourArray[step-1]);showButton(colourArray[step-1])}}
$(document).keypress(function(event){if(!flag){startGame();start=!0}
if(new Date().getTime()-startGameTime>5000){gameOver(event.key)}
if(flag&&!start){compareLetter(event.key)}
if(flag&&step===4){flag=!1;step=0;var goodjobSound=new Audio("goodjob.wav");goodjobSound.play();setTimeout(function(){startGame()},1000)}
start=!1})

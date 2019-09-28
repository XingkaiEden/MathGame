var initialTime = 60;  // The duration of the game
var scope = 100;  //the scope of mutiplcation, for example: 100 means Multiplication within one hundred.



//classes
//game functions
var stage = "waiting";
    function changeStatus(){
        if(stage == "playing")
            stage = "waiting";
        else
            stage = "playing";
    }
    function gameIsPlaying(){
        if(stage == "playing")
            return true;
        else
            return false;
    }



//Score Box functions
var scoreValue = 0
var score = document.getElementById("scorevalue");
    
    function resetScore(){
        score.innerHTML = scoreValue;
    }

function addScore(){
    scoreValue += 1;
    score.innerHTML = scoreValue;
}



//CounterBox functions
var time = document.getElementById("time");
var counter = document.getElementById("counter");

    
    function showCounter(){
        counter.style.display = "initial";
        time.innerHTML = initialTime;
        setInterval(function(){if(initialTime <= 0){ stage = "waiting"; //due to functions from outside does not work, I simply change value of stage here.
            return (document.getElementById("gameover").innerHTML =  "<p>Game Over!</p> <p>Your Score is "+ scoreValue + "</p>") && (document.getElementById("gameover").style.display = "initial");} 
                               initialTime -= 1; 
                               time.innerHTML = initialTime;
                              },1000);
    }


//check a value is in array or not.
function numberInArray(arr,x){
    if(arr.length == 0)
        arr.push(Math.floor(Math.random()*4+1));
    
   for(i=0; i<arr.length;i++){
       if(arr[i] == x)
           return true;
   }
    return false;
}

var array = [];
//Generator functions
function generateQA(){
    
    while(array.length < 4){
    var n = Math.floor(Math.random()*4+1);
    if(!numberInArray(array,n)){
        array.push(n);
    }
}
    for(i=0; i<array.length-1; i++){
        var indexValue = array[i];
//        window.console.log(indexValue);
        document.getElementById("c"+indexValue).innerHTML = fakeAnswer();
    }
    
    questionAndTrueAnswer();
}
  var x,y;//global variable that we want to use later on.

    function questionAndTrueAnswer(){
        
        x=Math.floor(Math.random()*scope);
        y=Math.floor(Math.random()*scope);
        tureAnswer(x,y);
        document.getElementById("questionDisplay").innerHTML = x+" X "+y;
        
    }
    
    function fakeAnswer(){
        return Math.floor(Math.random()*scope)*Math.floor(Math.random()*scope);
    }
    function tureAnswer(x,y){
        var indexValue = array[3];
//        window.console.log(indexValue);
        document.getElementById("c"+indexValue).innerHTML = x*y;
    }

//check if answer is correct
function answerCorrect(id){
    var selectedAnswer = document.getElementById(id).innerHTML;
    if (selectedAnswer == x*y)
        return true;
    else
        return false;
}


//Button functions

    
    function resetButton(){
        button.innerHTML = "Reset Game";
    }


//check if start button was clicked
var button = document.getElementById("resetbutton");

button.onclick=function(){
    

    if (gameIsPlaying())
        refreshPage();
    else{
        changeStatus();
        resetScore();
        showCounter();
        resetButton();
        generateQA();
    }



}

function refreshPage(){
    document.location.reload(true);
}







//what I learned from this code:
//1. don't call functions inside setInterval and setTimeout, just write the funtions inside brackets
//2. I can't put startButton and CounterBox in a same line althrough I had tried lots of methods. Finally, I find out that a sigle<div> can be used to include these two elements and the Problem Sovled!
////var array1 = ['a', 'b', 'c'];
//
//array1.forEach(function(element) {
//  console.log(element);
//});

//found a problem that array did not change for every run, therefore the correct answer is always at the same postion.


//critical point:
//1. how to randome put answer in boxes







//checking answer
function checkAnswer(id){
    if(gameIsPlaying()){
        var currentQuestion = document.getElementById("questionDisplay").innerHTML;
        if(answerCorrect(id)){
            showCorrectBox();
            addScore();
            generateQA();
            array = [];
        }else
            showWrongBox();
            
        
    }
}


//classes for checking answer stage
//correctbox functions
function showCorrectBox(){
    document.getElementById("correct").style.display = "initial";
    //we want this box disappear after 1 sec
    setTimeout(function(){document.getElementById("correct").style.display = "none";}, 1000);
    
}


//WrongBox functions
function showWrongBox(){
    document.getElementById("wrong").style.display = "initial";
    //we want same as proceeding
    setTimeout(function(){document.getElementById("wrong").style.display = "none";}, 1000);
}








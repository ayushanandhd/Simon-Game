var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = []
var level = 0
var started = false

//when a user clicks on the button
$(".btn").click(function (e) { 
    var userChosenColor = e.target.id //grabbing the color or id
    userClickedPattern.push(userChosenColor) //storing color to userClickedPattern array
    playSound(userChosenColor) //playing sound
    animatePress(userChosenColor) //animating the button

    checkAnswer(userClickedPattern.length-1)
});

//computer chooses the next sequence
function nextSequence(){
    userClickedPattern = []
    level++
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4); //generating a random number 0,1,2,3
    var randomChosenColor = buttonColors[randomNumber] //selecting a color using the random number
    gamePattern.push(randomChosenColor) //stoeing the color in gamePattern array

    playSound(randomChosenColor) //playing sound
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);   //animating the button
}

//function to play the sound
function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

//function to animate the press
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed") //adding the pressed class to the button

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed") //removing the pressed class
    },100)
}

//detecting if the user starts the game by pressing any key
$(document).keydown(function (e) { 
    if(!started){                                  //ensuring the game hasnt started
        $("#level-title").text("Level "+level)   //changing the title to display level
        nextSequence()  
        started = true                             //toggling the start
    }
});

//matching user's pattern with gamepattern 
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        // console.log("success")
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function() {
                nextSequence()
            }, 1000);
        }


    }
    else{
        var audio = new Audio("sounds/wrong.mp3")
        audio.play()
        // console.log("wrong")

        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver()
    }
}

function startOver(){
    level = 0
    gamePattern = []
    started = false
}
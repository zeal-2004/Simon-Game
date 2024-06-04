/*let stack = [];
let count = 1;
let color = ["green","red","yellow","blue"];
let dummy = [];

$(document).keydown(function() {
    gameStart();
})

$(".btn").click(function() {
    gameOver();
})

function gameOver() {
    $(".btn").addClass("pressed");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    setTimeout(function() {
        $(".btn").removeClass("pressed");
        $("body").removeClass("game-over");
    }, 200);
}

function gameStart() {
    $("h1").text("Level " + count);
    let random = Math.floor(Math.random()*4);
    stack.push(color[random]);
    for (let i=0;i<count;i++){
        $("#" + stack[i]).addClass("animation");
        setTimeout( function() { $("#" + stack[i]).removeClass("animation"); }, 100);
    }
    count++;
    console.log(stack);
}*/

let buttonColours = ["green","red","yellow","blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown( function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
    }
    started = true;
})

$(".btn").click( function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    console.log(currentLevel);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( function() { nextSequence();}, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout( function() { $("body").removeClass("game-over"); }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = []
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).addClass("animation");
    setTimeout( function() {
        $("#" + randomChosenColour).removeClass("animation");
    }, 100);

    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout( function() { $("#" + currentColour).removeClass("pressed"); }, 100);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
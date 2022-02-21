var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var gameover = false;
var level = -1;

$(document).on("keypress", function(event) {
  if(!started) {
    started = true;
    nextSequence();
  } else if (started && gameover) {
    gamePattern = [];
    userClickPattern = [];
    started = false;
    gameover = false;
    $("#level-title").html('Press A Key to Start');
  }
});

$(".btn").on("click", function() {
  if (started && !gameover) {
    var userChosenColour = this.id;
    userClickPattern.push(userChosenColour);

    animatePress(userChosenColour);
    var audio = new Audio(`sounds/${userChosenColour}.mp3`);
    audio.play();

    checkAnswer(userClickPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  console.log(`gamePattern => ${gamePattern}`);
  console.log(`userClickPattern => ${userClickPattern}`);

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");

    if (currentLevel === level) {
      userClickPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    gameover = true;

    var audio = new Audio('sounds/wrong.mp3');
    audio.play();

    $('body').addClass("game-over");
    setTimeout(function () {
      $('body').removeClass("game-over");
    }, 200);

    $("#level-title").html('Game Over, Press Any Key to Restart');
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  level = gamePattern.length - 1;

  $("#level-title").html(`Level ${level}`);

  animatePress(randomChosenColour);
   $("#" + gamePattern[level]).fadeTo(100, 0.2 ).fadeTo(100, 1);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//start page
window.onload = function () {
  $('#myCanvas').hide();
  $('.start-page').show();
};

document.getElementById('startButton').onclick = startGame;
function startGame() {
  $('#myCanvas').show();
  $('.start-page').hide();
  setInterval(draw, 10);
}
console.log('loaded');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var dxx = 2;
var dyy = -2;
var paddleHeight = 12;
var paddleWidth = 80;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 8;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 10;
var score = 0;
var lives = 3;
var reloading = false;
var rX = 400;
var rY = 200;


var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}

document.addEventListener("keydown", keyDownHandle, false);
document.addEventListener("keyup", keyUpHandle, false);

function keyDownHandle(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandle(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

// TO DO: Game pause
// function keyPressed() {
// // when user presses space bar
// if (key == 64) {
// if ( ball.is_in_start_position() ) {
// ball.move_upward(); // start game
// game.active = true;
// $('#messages #start').hide();
// } else {
// ball.toggle_pause(); // pause/resume game
//     }
//   }
// }
function collisionDetection2() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (rX > b.x && rX < b.x + brickWidth && rY > b.y && rY < b.y + brickHeight) {
          dyy = -dyy;
          b.status = 0;
          drawBall2();
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("WINNER WINNER, CHICKEN DINNER!");
            document.location.reload();
          }
        }
      }
    }
  }
}


function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          drawBall2();
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("WINNER WINNER, CHICKEN DINNER!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'hsl(' + 180 * Math.random() + ', 50%, 50%)';
  ctx.fill();
  ctx.closePath();
}

function drawBall2() {
  console.log("kinda working");
  ctx.beginPath();
  ctx.arc(rX, rY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#F3CEF6';
  ctx.fill();
  ctx.closePath();
}

function randomNum(maxNum) {
  var num = Math.floor((Math.random() * maxNum) + 1);
  return num;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#6ECF9E";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#62CB83";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#C6D3EC";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#C6D3EC";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
  if (reloading) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  if (score >= 6){
    console.log('hi');
    drawBall2();
}
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  collisionDetection2();

//ball2
  if (rX + dxx > canvas.width - ballRadius || rX + dxx < ballRadius) {
    dxx = -dxx;
  }
  if (rY + dyy < ballRadius) {
    dyy = -dyy;
  } else if (rY + dyy > canvas.height - ballRadius) {
    if (rX > paddleX && rX < paddleX + paddleWidth) {
      dyy = -dyy;
    } else {
        // clearInterval(intervalID);
    }
}

//ball1
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives --;
        if (!lives) {
          reloading = true; //stops the double re-load
          alert("GAME OVER");
          document.location.reload();
        }
      else {
        x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
          }
      }
    }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  rX += dxx;
  rY += dyy;
}
var intervalID = setInterval(draw, 2000); //the higher the number, the slower the ball

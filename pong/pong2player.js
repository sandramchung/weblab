// Pong game
// Bouncing ball and user-controlled paddle

// Game configuration
// Change these values to customize your game
var fieldWidth = 600;      // how wide is the playing field
var fieldHeight = 400;     // how tall is the playing field
var fieldColor = 0x337733; // what color is the playing field

var paddleWidth = 10;      // how wide is the paddle
var paddleHeight = 70;     // how tall is the paddle (originally 70)
var paddleColor = 0xffff00;// what color is the paddle
var paddleSpeed = 10;      // how fast will the paddle move
var paddleXPos = fieldWidth - Math.floor(fieldWidth / 10); // 10% from right
var paddleYPos = Math.floor((fieldHeight - paddleHeight) / 2); // middle

var lpaddleXPos = Math.floor(fieldWidth / 10); // 10% from left 
var lpaddleYPos = paddleYPos;  // middle

var ballSize = 10;         // how big is the ball
var ballXPos = Math.floor(fieldWidth / 10); // start 10% from left
var ballYPos = Math.floor((fieldHeight - ballSize) / 2); // middle
var ballXSpeed = 3 * Math.random() + 5;        // what is the initial velocity of the ball
var ballYSpeed = 4 * Math.random() + 2;
var ballColor = 0xffffff;  // what color is the ball

var keyState = 0;          // current state of arrow keys for right paddle
var lkeyState = 0;         // current state of arrow keys for left paddle
var intTimeHandle = 0;        // pointer to the interval timer
var count = 0;              // tracks game time in 20 ms intervals
var time = 0;               // tracks game time
var score = 0;             // stores score for each game 
var hiscore = 0;             //stores high score

// Debug output
// you can send debug print message to the screen using this function
// this is helpful if you are not getting the results that you expect
function output(message) {
    document.getElementById("output").innerHTML += message + "<br/>";
}

function setPosition(x, y) {
    this.xpos = x;
    this.ypos = y;
    this.obj.style.top = y.toString() + "px";
    this.obj.style.left = x.toString() + "px";
}

function setColor(newColor) {
    newColor = "000000" + newColor.toString(16);
    this.obj.style.backgroundColor = "#" + newColor.substr(newColor.length - 6);
}

// Playing field object
function PlayingField(width, height, color) {
    this.width = width;
    this.height = height;
    this.obj = document.getElementById("playingField");
    this.obj.style.width = width.toString() + "px";
    this.obj.style.height = height.toString() + "px";
    this.setColor = setColor;
    this.setColor(color);
    this.obj.onclick = function() {
        // start the game when the field is clicked
        // setup the timer tick event handler
        document.getElementById('instructions').style.display='none';
        if (intTimeHandle === 0) {
            clearInterval(intTimeHandle);
        }
        newGame();
    }
}

// Paddle object
function Paddle(id, width, height, color, speed, xpos, ypos) {
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.obj = document.getElementById(id);
    this.obj.style.width = width.toString() + "px";
    this.obj.style.height = height.toString() + "px";
    
    // you can use this method to change the color of the paddle
    this.setColor = setColor;
    this.setColor(color);

    // you can use this method to change the location of the paddle
    this.setPosition = setPosition;
    this.setPosition(xpos,ypos);
}

// Ball object
function Ball(size, xpos, ypos, xspeed, yspeed, color) {
    this.xspeed = xspeed;
    this.yspeed = yspeed;

    this.obj = document.getElementById("ball");

    // you can use this method to update the ball's location
    this.setPosition = setPosition;

    // you can use this method to change the size of the ball
    this.setSize = setSize;
    function setSize(size) {
        this.size = size;
        this.obj.style.width = this.size.toString() + "px";
        this.obj.style.height = this.size.toString() + "px";
        var radius = Math.floor(size / 2);
        this.obj.style.borderRadius = radius.toString() + "px";
        this.obj.style.MozBorderRadius = radius.toString() + "px";
        this.obj.style.WebKitBorderRadius = radius.toString() + "px";
    }
    
    this.setPosition(xpos,ypos);
    this.setSize(size);
    this.setColor = setColor;
    this.setColor(color);
}

// instantiate a field object - this is the background object
var field = new PlayingField(fieldWidth, fieldHeight, fieldColor);

// instantiate a paddle object - this is what the player controls
// var paddle = new Paddle("paddle", paddleWidth, paddleHeight, paddleColor, paddleSpeed, paddleXPos, paddleYPos);
var paddle = new Paddle("paddle", paddleWidth, 400, paddleColor, paddleSpeed, paddleXPos, paddleYPos); // wacky debugging paddle

// instantiate a second paddle
var lpaddle = new Paddle("lpaddle", paddleWidth, paddleHeight, paddleColor, paddleSpeed, lpaddleXPos, lpaddleYPos);

// instantiate a ball object - the bouncing ball
var ball = new Ball(ballSize, ballXPos, ballYPos, ballXSpeed, ballYSpeed, ballColor);

// The following functions track the arrow keys when they are pressed
// pressing the up arrow key will cause keyState to be -1
// (negative is the up direction)
// pressing the down arrow key will cause keyState to be 1
// (positive is the down direction)
// releasing either key will cause keyState to be 0
// (no direction - stop the motion of the paddle)
document.onkeydown = function (e) {
    var evt = e || window.event;
    if (evt.keyCode === 38) {
        // up arrow
        keyState = -1;
    } 
    else if (evt.keyCode === 40) {
        // down arrow
        keyState = 1;
    }
    else if (evt.keyCode === 81) {
        // letter q
        lkeyState = -1;
    }
    else if (evt.keyCode === 65) {
        // letter a
        lkeyState = 1;
    }
    return false;
}

document.onkeyup = function (e) {
    var evt = e || window.event;
    if (evt.keyCode == 38 || evt.keyCode == 40) {
        keyState = 0;
    }
    if (evt.keyCode == 81 || evt.keyCode == 65) {
        lkeyState = 0;
    }
    return false;
}

// This function should be called when the ball contacts the right wall
// of the field. This should only happen when the player fails to contact
// the ball with the paddle.
function gameOver() {
    clearInterval(intTimeHandle);
    intTimeHandle = 0;
    document.getElementById('instructions').innerHTML = "GAME OVER <br/><br/> Click to play again";
    document.getElementById('instructions').style.display = "block";
    field.setColor(0x033003);
}

// Draws a new playing field and resets the score
function newGame() {
    ballXSpeed = 3 * Math.random() + 5;        // what is the initial velocity of the ball
    ballYSpeed = 4 * Math.random() + 2;
    keyState = 0;
    lkeyState = 0;          // current state of arrow keys
    count = 0;              // tracks game time in 20 ms intervals
    time = 0;               // tracks game time
    score = 0;             // stores score for each game 

    field.setColor(fieldColor);  //reset field color
    paddle.setColor(paddleColor); // reset paddle color
    ball.setColor(ballColor);   // reset ball color
    paddle.setPosition(paddleXPos,paddleYPos); //reset paddle position
    lpaddle.setPosition(lpaddleXPos,lpaddleYPos);
    ball.setPosition(ballXPos,ballYPos);

    document.getElementById('instructions').style.display='none';

    intTimeHandle = setInterval(function(){timerTick()},20);
}

// random color generator

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

// create a timer call back function
// this is a list of things that need to be done every time the timer ticks
function timerTick() {
    
    // move the ball
    
    var currx = ball.xpos;
    var curry = ball.ypos;
    var padx = paddle.xpos;
    var pady = paddle.ypos;
    var lpadx = lpaddle.xpos;
    var lpady = lpaddle.ypos;

    // bounces off paddle and changes color of paddle and itself
    if ((currx <= padx) && (currx + ball.xspeed > padx) && (curry > pady - ball.size / 2) && (curry < pady + paddle.height - ball.size / 2)) {
        ball.xspeed *=- 1;
        paddle.setColor(getRandomColor());
        ball.setColor(getRandomColor());
        field.setColor(getRandomColor());
        score++;
        document.getElementById('scorebox').innerHTML = "SCORE: " + score;
        if (score > hiscore) {
            hiscore = score;
            document.getElementById('hiscorebox').innerHTML = "BEST: " + hiscore;
        }
    }
    
    if ((currx >= lpadx + paddleWidth) && (currx + ball.xspeed < lpadx + paddleWidth) && (curry > lpady - ball.size / 2) && (curry < lpady + paddle.height - ball.size / 2)) {
        ball.xspeed *=- 1;
        lpaddle.setColor(getRandomColor());
        ball.setColor(getRandomColor());
        field.setColor(getRandomColor());
        score++;
        document.getElementById('scorebox').innerHTML = "SCORE: " + score;
        if (score > hiscore) {
            hiscore = score;
            document.getElementById('hiscorebox').innerHTML = "BEST: " + hiscore;
        }
    }

    // bounces off walls
    if ((currx < 0) || (currx > field.width - ball.size)) {
        gameOver();
    } 
    if (curry < 0 ) {
        curry = 0; // bounce off top wall
        ball.yspeed *= -1;
    } 
    if (curry > (field.height - ball.size)) {
        curry = field.height - ball.size; // bounce off bottom wall
        ball.yspeed *= -1;
    } 

    currx += ball.xspeed;
    curry += ball.yspeed;
    
    ball.setPosition(currx, curry); 
    

    // move the paddle
    if (pady < 0) {
        pady = 0;
        keyState = 0;
    }
    if (pady > (field.height - paddle.height)) {
        pady = field.height - paddle.height;
        keyState = 0;
    }    
    pady += (paddle.speed * keyState);
    paddle.setPosition(padx, pady);

    if (lpady < 0) {
        lpady = 0;
        lkeyState = 0;
    }
    if (lpady > (field.height - paddle.height)) {
        lpady = field.height - paddle.height;
        lkeyState = 0;
    }    
    lpady += (paddle.speed * lkeyState);
    lpaddle.setPosition(lpadx, lpady);
    alert("Set left paddle position to " + lpadx + "," + lpady);


    // update timer
    if (count == 50) {
        time++;
        count = 0;
        var timer = document.getElementById('timer');
        if (time%60 < 10) {
            timer.innerHTML = Math.floor(time/60) + ":0" + time%60;
        } else {
            timer.innerHTML = Math.floor(time/60) + ":" + time%60;
        }
    }
    else {
        count ++;
    }   
}
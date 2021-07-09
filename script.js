//variáveis
let canvas = document.getElementById('snake'),
context = canvas.getContext("2d"),
box = 32,
snake = [
  {
    x: 8*box,
    y: 8*box
  }
];

let direction = "";

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
},
foodX = food.x,
foodY = food.y;

let score = 0,
record = 0,
pScore = document.getElementById('score'),
pRecord = document.getElementById('bestScore');

function criarBG() {
  context.fillStyle = "black";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "white";
    context.fillRect(snake[i].x, snake[i].y, box, box);
    console.log(snake[0].x, snake[0].y);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect( foodX, foodY, box, box);
}

// direções
// 37 = esquerda
// 38 = cima
// 39 = direita
// 40 = baixo
function update(event){
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

document.addEventListener('keydown', function() {update(event);}, false);

function setScore() {
  let bestScore = localStorage.getItem("score");

  if (bestScore < score) {
    record = score;
    localStorage.setItem("score", record);
  }

  pScore.innerHTML = score;
  pRecord.innerHTML = bestScore;
}

function gameOver() {
  let pOver = document.getElementById('gameOver');
  clearInterval(jogo);
  pOver.innerHTML = "<span class='red'>Game Over :c</span>";
}

function iniciarJogo(){
  let snakeX = snake[0].x,
  snakeY = snake[0].y;

  // if(snakeX > 15*box && direction == "right") snakeX = 0;
  // if(snakeX < 0 && direction == "left") snakeX = 16*box;
  // if(snakeY > 15*box && direction == "down") snakeY = 0;
  // if(snakeY < 0 && direction == "up") snakeY = 16*box;

  //colisões da cobrinha
  for (let i = 1; i < snake.length; i++) {
    if(snakeX == snake[i].x && snakeY == snake[i].y){
      gameOver();
    }
  }

  if(snakeX > 15*box && direction == "right"){
    snakeX = 15*box;
    gameOver();
  }
  if(snakeX < 0 && direction == "left"){
    snakeX = 0;
    gameOver();
  }
  if(snakeY > 15*box && direction == "down"){
    snakeY = 15*box;
    gameOver();
  }
  if(snakeY < 0 && direction == "up"){
    snakeY = 0;
    gameOver();
  }

  criarBG();
  criarCobrinha();
  drawFood();
  setScore();

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != foodX || snakeY != foodY){
    snake.pop();
  }
  else {
    foodX = Math.floor(Math.random() * 15 + 1) * box;
    foodY = Math.floor(Math.random() * 15 + 1) * box;
    score += 1000;
  }


  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);
    




var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var play = 0;
var end = 1;
var gameState = play;
var survivalTime = 0;

function preload() {
  monkey_running = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  monkey = createSprite(windowWidth / 5, (windowHeight / 4) * 3, 20, 20);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(windowWidth / 2,(windowHeight / 4) * 3.2,windowWidth * 4,5);
  obstacleGroup = createGroup();
  fruitGroup = createGroup();
  ground.shapeColor = 100;
}

function draw() {
  background("white");
  monkey.collide(ground);
  if (gameState === play) {
    stroke("black");
    fill("black");
    survivalTime = Math.ceil(frameCount);
    text("SURVIVAL TIME = " + survivalTime, windowWidth / 2, windowHeight / 2);
    if (keyDown("space")&&monkey.y>ground.y-50 ) {
      monkey.velocityY = -20;
    }
    stone();
    fruits();
    monkey.velocityY += 0.8;
    if (fruitGroup.collide(monkey)) {
      fruitGroup.destroyEach();
    }
    if (obstacleGroup.collide(monkey)) {
      gameState = end;
    }
  }
  if (gameState === end) {
    monkey.destroy();
    obstacleGroup.destroyEach();
    fruitGroup.destroyEach();
    ground.destroy();
    textSize(20);
    fill("black");
    stroke("black");
    text("GAME OVER", windowWidth / 2, windowHeight / 2);
  }
  drawSprites();
}

function stone() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(windowWidth, (windowHeight / 4) * 3.1, 20, 20);
    obstacle.velocityX = -5;
    obstacle.setCollider("rectangle", 0, 0, 400, 400);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;  
    obstacleGroup.add(obstacle);
    
  }
}
function fruits() {
  if (frameCount % 200 === 0) {
    fruit = createSprite(windowWidth, (windowHeight / 4) * 2);
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -5;
    fruitGroup.add(fruit);
  }
}
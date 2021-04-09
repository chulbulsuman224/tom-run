var player,playerImage;
var backGroundImage;
var backGround,gameOverImage;
var coinsGroup,diamondGroup;
var coinImage,diamondImage;
var turtleImage,turtleGroup;
var score=0;
var gameState="play";

function preload(){
  playerImage=loadImage("images/tom.png")
  backGroundImage= loadImage("images/background.jpg")
  coinImage =loadImage("images/Coins.png")
  diamondImage =loadImage("images/diamond.png")
  turtleImage = loadImage("images/turtle.png")
  gameOverImage = loadImage("images/gameover.jpg")
}





function setup() {
  createCanvas(400,800);
  
  backGround=createSprite(200,400);
  backGround.addImage(backGroundImage);
  backGround.velocityY=-2;
  backGround.y=backGround.height/2;
  backGround.scale=1.5;
  

  player=createSprite(200, 80, 50, 50);
  player.addImage(playerImage)
  player.scale=0.4;
  
  coinsGroup= new Group();
 diamondGroup= new Group();
  turtleGroup= new Group();
}

function draw() {
  background(0);
  if(gameState==="play"){

  edges=createEdgeSprites()
  player.collide(edges)
  
  if(backGround.y<0){
    backGround.y=backGround.height/2;
  }
  if(keyDown("right")){
    player.x=player.x+5;
  }
  if(keyDown("left")){
    player.x=player.x-5;
   
  } 
  if(frameCount % 20=== 0){
    var rand=Math.round(random(1,3))
    if(rand===1){
      spawnCoins();
    }
    else if(rand===2){
      spawnDiamond();
    }
    else{
      spawnTurtle();
    }
  }
  for(var i=0;i<coinsGroup.maxDepth();i++){
    if(coinsGroup.get(i)!=null&& coinsGroup.isTouching(player)){
      coinsGroup.get(i).destroy()
      score=score+1;
    }
  }
  for(var i=0;i<diamondGroup.maxDepth();i++){
    if(diamondGroup.get(i)!=null&& diamondGroup.isTouching(player)){
      diamondGroup.get(i).destroy()
      score=score+5;
    }
  }
  if(turtleGroup.isTouching(player)){
    gameState="end";
  }
}
else if(gameState==="end"){
  backGround.addImage(gameOverImage)
  backGround.velocityY=0;
  backGround.scale=0.5;
  diamondGroup.destroyEach();
  coinsGroup.destroyEach();
  turtleGroup.destroyEach();
  backGround.y=400;
}
  drawSprites();
  textSize(20)
  fill("black")
  text(score,350,50)
}

function spawnCoins(){
var coin=createSprite(200,800,10,10)
coin.x=random(10,390);
coin.addImage(coinImage)
coin.velocityY=-5
coinsGroup.add(coin)
coin.scale=0.1
}

function spawnDiamond(){
  var diamond=createSprite(200,800,10,10)
diamond.x=random(20,350);
diamond.addImage(diamondImage)
diamond.velocityY=-5
diamondGroup.add(diamond)
diamond.scale=0.08;
}

function spawnTurtle(){
  var turtle=createSprite(200,800,10,10)
  turtle.x=random(20,350);
  turtle.addImage(turtleImage)
  turtle.velocityY=-5
  turtleGroup.add(turtle)
  turtle.scale=0.2;
}
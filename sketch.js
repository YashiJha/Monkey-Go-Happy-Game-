var monkey, monkeyimg, ground, gameOverimg, gameState, BananasGroup, StonesGroup, backdropimg, backdrop, gameOver, bananasimg,banana,count,stonesimg,stone,count;

function preload() {
  monkeyimg=loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  backdropimg=loadImage("backdrop.jpg");
  gameOverimg=loadImage("https___i.pinimg.com_originals_c6_ff_ed_c6ffedfe8cc0e75a4e5508daa63d50c3.jpg");
  bananasimg=loadImage("banana.png");
  stonesimg=loadImage("stone.png");
}

function setup() {
  createCanvas(550, 400);
  
  gameState=1;
  
  backdrop=createSprite(200,200,20,20);
  backdrop.addImage("yashi1",backdropimg);
  //backdrop.x = backdropimg.width / 2;
  //backdrop.velocityX = -6;
  backdrop.scale=1.65;
  
  monkey=createSprite(80,255,20,50);
  monkey.addAnimation("yashi",monkeyimg);
  monkey.scale=0.09;
  
  BananasGroup=new Group();
  StonesGroup=new Group();
  
  gameOver = createSprite(275,200);
  gameOver.addImage("gameOver", gameOverimg);
  gameOver.scale = 0.95;
  gameOver.visible = false;
  
  ground = createSprite(200,260,400,5);
  ground.visible = false;
  
  count = 0;
}

function draw() {
  background(220);
    //display score
  
  //console.log(gameState);
  
  BananasGroup.x=StonesGroup.x;
  
  if(gameState === 1){
    
    //scoring
    count = count + Math.round(getFrameRate()/61);
    monkey.collide(ground);
    
     //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 200){
      monkey.velocityY = -12 ;
    }
    //add gravity
      monkey.velocityY = monkey.velocityY + 0.8;
  
    //console.log(monkey.y);
    
    
    //display bananas
    Bananas();
    //display stones
    Stones();
    
    if(monkey.isTouching(BananasGroup)){
      score();
      BananasGroup.destroyEach();
    }
    
    //End the game when monkey is touching the stone
    if(StonesGroup.isTouching(monkey)){
      monkey.scale=0.08;
      gameState = 0;
      monkey.velocityX=0;
      monkey.collide(StonesGroup);
    }
  }
  
  else if(gameState === 0) {
    
    //StonesGroup.visible=false;
    gameOver.visible = true;
    
    
    //set velcity of each game object to 0
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.visible=false;
    
    StonesGroup.destroyEach();
    BananasGroup.destroyEach();
    
    //StonesGroup.setVelocityXEach(0);
    //BananasGroup.setVelocityXEach(0);
    
    //change the trex animation
    //monkey.setAnimation("monkeystop");
    
    //set lifetime of the game objects so that they are never destroyed
    
    
    
    
  }
  
  if((keyDown("space") && gameState===0)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  //monkey.collide(edges);
  drawSprites();
  
  fill("purple");
  textSize(20);
  text("Survival Time: "+ count, 380, 50);
}

function reset(){
  //count = Math.round(frameCount/80);
  gameState=1;
  count=0;
  gameOver.visible=false;
  monkey.visible=true;
}

function Bananas() {
  //code for bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,300,40,10);
    banana.y = random(150,180);
    banana.addAnimation("yashi2",bananasimg);
    banana.scale = 0.04;
    banana.velocityX = -6 //(6 + 3*count/100);
    
    //assign lifetime to the variable
    banana.lifetime = 134;

    //banana.debug=true;
    banana.setCollider("rectangle",0,20,1000,460);
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    BananasGroup.add(banana);
  }
}

function Stones() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(400,250,10,40);
    stone.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    //var rand = randomNumber(1,6);
    stone.addAnimation("Yashi",stonesimg);
    
    //stone.debug=true;
    stone.setCollider("circle",0,0,200);
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.1;
    stone.lifetime = 70;
    //add each obstacle to the group
    StonesGroup.add(stone);
  }
}

function score(){
  var rand=Math.round(random(1,4));
  switch (monkey) {
      case 1:
        monkey.scale=0.1;
        break;
      case 2:
        monkey.scale=0.13;
        break;
      case 3:
        monkey.scale=0.16;
        break;
      case 4:
        monkey.scale=0.19;
        break;
    }
}
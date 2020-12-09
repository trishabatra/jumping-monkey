    //Create variables for monkey
    var monkey , monkey_running

    //Create variables for bananas and obstacles
    var banana ,bananaImage, obstacle, obstacleImage

    //Create variables for obstacle and banana group
    var bananaGroup, obstaclesGroup;

    //Create a varaiable for survival time and score
    var survivalTime=0;
    var score=0;

    //Create variable for background
    var back,backgroundImage;

function preload(){
  
    //Load animation of the monkey
    monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

   //Load images of the banana and obstacle
   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("obstacle.png");

   //Load image for background
   backgroundImage=loadImage("jungle.jpg");
  
}

function setup() {
    //Create canvas
    createCanvas(600,600);
  
    //Create monkey
    monkey=createSprite(80,315,20,20);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.2;

    //Create ground
    ground=createSprite(400,350,900,10);
    ground.velocityX=-4;
    ground.x=ground.width/2
    console.log(ground.x);
    ground.visible=false;

    //Create group for bananas and obstacles
    bananaGroup=new Group();
    obstaclesGroup= new Group();
  
    //Create background 
    back=createSprite(100,100);
    back.addImage(backgroundImage);
    back.x=back.width/2
    back.velocityX=-4;

}


function draw() {
  
  background("white");
  
  //Create infinite ground
  if(ground.x<0) {
    ground.x=ground.width/2;
  } 
  
    //Create infinite background
  if(back.x<0) {
    back.x=back.width/2;
  } 
  
  if(bananaGroup.isTouching(monkey)){
    score=score+2;
  }
  //If score increases by 10,20,30 and 40 increase the size of the monkey
  switch(score){
    case 10:monkey.scale=0.12;
      break;
    case 20:monkey.scale=0.14;
      break;
    case 30:monkey.scale=0.16;
      break;
    case 40:monkey.scale=0.18;
      break;
      default: break;
  } 
  //If space is pressed,the moneky should jump
  if(keyDown("space")&& monkey.y >= 160) {
    monkey.velocityY = -12;
    }
  
    //Add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //Make monkey collide with th ground
    monkey.collide(ground);  
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
  
    //Call the functions of banana and obstacles
    createBanana();
    createObstacles();
  
  
  
  
    //Draw the sprites
    drawSprites();
  
    //Score
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 440,50);  
  
    //Survival time
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate()) 
    text("Survival Time: "+ survivalTime, 100,50);
  
}

    //Create functions to create bananas and obstacles
function createBanana(){
  if(frameCount%80===0){
     //Create banana
    banana=createSprite(600,250,10,10);
    
    
    //Let banana appear at different positions
    banana.y=Math.round(random(120,200));
    
    //Add banana image
    banana.addImage(bananaImage);
    
    //Scale the banana
    banana.scale=0.1  ;
    
    //Give velocity to the banana
    banana.velocityX=-2;
    
    //Give lifetime to the banana
    banana.lifetime=250;
    
    
    monkey.depth = banana.depth + 1;
    
    //Add banana to bananaGroup
    bananaGroup.add(banana);
  }
}

function createObstacles(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(800,324,10,40);
    obstacle.velocityX = -6;
    
    //Add image to the obstacle 
    obstacle.addImage(obstacleImage);
    
    //Scale the obstacle
    obstacle.scale=0.15;
    
    //Add lifetime to the obstacle     
    obstacle.lifetime = 250;
    
    //Add obstacles to the group
    obstaclesGroup.add(obstacle);
}
}



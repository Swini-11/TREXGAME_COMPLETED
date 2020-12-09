//declaration

var trex, trex_running;
var Edges, ground, inviground;
var cloud;
var score=0;
var PLAY=1;
var END=0;
var gameState = PLAY;
var gameover;
var restart;


function preload(){
  //for images and sounds
    trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
    ground_Img = loadImage ("ground2.png");
    cloud_Img = loadImage("cloud.png");
    gameover_Img = loadImage("gameOver.png");
    restart_Img = loadImage("restart.png");
    trex_collidedImg = loadImage("trex_collided.png");
    
    obstacle1= loadImage("obstacle1.png")
    obstacle2= loadImage("obstacle2.png")
    obstacle3= loadImage("obstacle3.png")
    obstacle4= loadImage("obstacle4.png")
    obstacle5= loadImage("obstacle5.png")
    obstacle6= loadImage("obstacle6.png")
  
  
}

function setup() {
  createCanvas(600, 200);
  
inviground = createSprite(300,190,600,10) ;
  inviground.visible = false;
  
  
  //trex creating and animation and scale
  trex = createSprite(50,150,100,10);
  trex.addAnimation("running", trex_running);
  trex.scale=0.5;
  
  
  //ground creating
 ground = createSprite(300,180,600,20)
ground.addImage (ground_Img)
  
  gameover= createSprite(300,100,10,10);
    gameover.addImage(gameover_Img);
    gameover.scale=0.5;
    gameover.visible=false;
    
    
    restart= createSprite(300,130,10,10);
    restart.addImage(restart_Img);
    restart.scale=0.5;
  restart.visible=false;
    
  
  
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  
 // trex.debug=true;
  //trex.setCollider("circle",0,0,40);
//  trex.setCollider("rectangle",0,0,trex.width-300,trex.height);
  
  
  
}

function draw(){
  
  //trex jumping
  
  background("white");
 text("Your Score Is : "+score , 400,50);
  
  if(gameState===PLAY){
    
    score = score+ Math.round(getFrameRate()/60)
    
     if(ground.x<0){
    
    ground.x = ground.width/2;
     
  }
   if(keyDown ("space")&& trex.y>=161.5){
    
    trex.velocityY=-14;
     
 }
    //for gravity
 trex.velocityY = trex.velocityY+1; 
      
  ground.velocityX=-(6 + 3 * score/100);
    
    
     SpawnClouds();
  spawnObstacles();
    
    if(trex.isTouching(ObstaclesGroup)){
      
      
      gameState=END;
    }
  
  }
  else if(gameState===END){
  
    ground.velocityX=0;
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityXEach(0);
    
    CloudsGroup.setLifetimeEach(-1);
    ObstaclesGroup.setLifetimeEach(-1);
    trex.velocityY=0;
    trex.changeAnimation("running",trex_collidedImg);
    
    gameover.visible=true;
    restart.visible=true;
     
    if(mousePressedOver(restart)){
      reset();
      
    }
}  
  
    
  
  //edges and collide ground
  Edges = createEdgeSprites()
  trex.collide (inviground);
  
 
  
  
  drawSprites();
}



function SpawnClouds (){
  
  if(frameCount%60===0){
   
    cloud = createSprite(600,140,40,10);
    cloud.velocityX = -3;
    cloud.addImage (cloud_Img);
    cloud.scale=0.5;
    cloud.y = Math.round(random(80,120));  
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloud.lifetime = 200;
    
    CloudsGroup.add(cloud);
  }
  
  
}

function spawnObstacles(){
  if(frameCount%60===0){
   var obstacles = createSprite(600,160,10,10)
    obstacles.velocityX=-(6 + 3 *score/100);
    obstacles.scale=0.5;
    obstacles.lifetime = 200;
    var rand = Math.round(random(1,6));
  //  obstacles.addImage("obstacle"+ rand );
    
    switch(rand){
        
      case 1 :
             obstacles.addImage(obstacle1);
             break;
     case 2 : obstacles.addImage(obstacle2);
             break;         
     case 3 : obstacles.addImage(obstacle3);
             break;   
      case 4 : obstacles.addImage(obstacle4);
             break;   
     case 5 : obstacles.addImage(obstacle5);
             break;   
      case 6 : obstacles.addImage(obstacle6);
             break;           
    default :
        break;
        
        
  }
  
    ObstaclesGroup.add(obstacles);
}

}


function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
trex.changeAnimation("running",trex_running);
  score=0;
}








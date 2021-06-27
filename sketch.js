const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var world,engine;
var score=0;

var trex;
var trex1;
var ground;
//var obstacle;
var obstacleGroup;
var gameState=1;
var database;
var score=0;


function preload(){  
}

function setup() {

  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(windowWidth/2,windowHeight-200,windowWidth,10);
  trex = new Trex(windowWidth/2,windowHeight-300,20,20);

  obstacleGroup = new Group();

  trex1 = createSprite(trex.body.position.x,trex.body.position.y,20,20);

  database = firebase.database();

  gameState= database.ref('gameState');
  gameState.on("value", function(data){
    gameState = data.val();
  });

}

function draw(){
  background(200,20,200);

  Engine.update(engine);

  World.add(world, trex);

  ground.display();
  trex.display();
  
  camera.position.x=displayWidth/2;
  camera.position.y=trex.body.position.y;

  Obstacles();

  if(gameState===1){
   
    if(keyDown("UP_ARROW")){ 
      score=score+1;
      gameState=2;
      
    }
  }

  /*if(trex.body.position.y-obstacleGroup[0].y===0){
   
  } */

  if(gameState===2){
   
    database.ref('/').update({'gameState':gameState});
    //console.log(score);
    obstacleGroup[0].remove();    
    console.log(obstacleGroup);
  }

  drawSprites();

}

function keyPressed(){
 
    if(keyCode === UP_ARROW){
      Matter.Body.applyForce(trex.body,trex.body.position,{x:0,y:-0.01});
      Matter.Body.setStatic(trex.body, false);
      gameState=2;
    
  }
  
}

function Obstacles(){
  if(frameCount%60===0){
     var obstacle = createSprite(400,1000,30,30);
    obstacle.y = trex.body.position.y-100;
    obstacle.x = trex.body.position.x;

    obstacleGroup.add(obstacle);
    //console.log(trex.body.position.y);
  }
}

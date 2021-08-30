const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backGroundImg;
var crane;
var hook;
var chain;
var garbage1,garbage2,garbage3;
var garbageGroup;
var invisibleSprite,invisibleStand;
var garbageTruck,garbageTruckImg;
var score = 0;
var touchArray = [];
var progressCounter = 0;

function preload() {
   backGroundImg = loadImage("images/background.gif");

   garbage1 = loadImage("images/bottle.png");
   garbage2 = loadImage("images/poly-bag.png");
   garbage3 = loadImage("images/polythene.png");
   garbageTruckImg = loadImage("images/garbage truck.png");

}

function setup(){
    var canvas = createCanvas(1400,800);
    engine = Engine.create();
    world = engine.world;

    crane = new Crane(1300,475);
    hook = new Hook(1300,475);
    chain = new Chain(hook.body,crane.body,-130,-130)
    garbageGroup = new Group();

    invisibleSprite = createSprite(100,100,30,30);
    invisibleSprite.visible = false;

    garbageTruck = createSprite(200,455);
    garbageTruck.addImage(garbageTruckImg);
    garbageTruck.scale = 0.7;
    invisibleStand = createSprite(250, 400,250,20);
    invisibleStand.visible = false;


    for(var i = 0; i < 10; i++){
        garbage = createSprite(random(400,1200),random(640,750));
        var randomNumber = Math.round(random(1,3))
        switch(randomNumber){
            case 1 : garbage.addImage(garbage1);
                    garbage.scale = 0.15;
                    break;
            case 2 : garbage.addImage(garbage2);
                    garbage.scale = 0.15;
                    break;
            case 3 : garbage.addImage(garbage3);
                    garbage.scale = 0.5;
                    break;
        }
        garbageGroup.add(garbage);
        touchArray.push(false);
    }
}

function draw(){
    background(backGroundImg);
    Engine.update(engine);

   crane.display();
   hook.display();
   chain.display();

   invisibleSprite.x = hook.body.position.x;
   invisibleSprite.y = hook.body.position.y;

   textSize(20);
   fill("black");
   text("Score : " + score, displayWidth/2,20)
   

 for(var i = 0 ; i < garbageGroup.length ; i++){
     if(invisibleSprite.isTouching(garbageGroup[i])){
        garbageGroup[i].x = invisibleSprite.x;
        garbageGroup[i].y = invisibleSprite.y;
        touchArray[i] = true;
     }

     if(invisibleStand.isTouching(garbageGroup[i])){
         garbageGroup[i].destroy();
         score = score + 5;
         progressCounter += 1;
         touchArray.splice(i,1);
     }
 }

 for(var i = 0; i < touchArray.length; i++){
    if(touchArray[i] === true){
        garbageGroup[i].x = invisibleSprite.x;
        garbageGroup[i].y = invisibleSprite.y;
    }
 }
  
 for(var i = 0 ; i < 10 ; i++){
    if(garbageGroup.length <= (9-i)){
        fill("red");
    }
    else{
        fill("white");
    }
    rect((i * 40)+500, 50,20,20);
 }

 console.log("progressCounter"+ progressCounter);
 if(progressCounter >= 10 ){
    textSize(40);
    text("Congratulations, You have saved the World",300,150);
 }

   drawSprites();
}

function keyPressed(){
    if(keyCode === 37){
     //   Matter.Body.setStatic(crane.body,true);
        crane.body.position.x -= 15;
    }
    if(keyCode === 39){
      //  Matter.Body.setStatic(crane.body,true);
        crane.body.position.x += 15;
    }
}

function mouseDragged(){
    Matter.Body.setPosition(hook.body,{x: mouseX, y : mouseY});
}

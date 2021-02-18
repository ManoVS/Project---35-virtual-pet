var dog,dogImg,happydogImg,database,food,foodStock;
var foods;
var database;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(400,350);
  dog.addImage("dog",dogImg);
  dog.scale = 0.4;
  
}


function draw() {  
  background("green");
  
  if(foods !== undefined){
    textSize(20);
    fill(255);
    text("Note : press UP_ARROW to feed Mango milk",50,50);
    text("Food remaining : " + foods,150,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foods);
      dog.addImage("dog",happyDogImg);
      foods = foods - 1
    }

    if(keyWentUp(UP_ARROW)){
      writeStock(foods);
      dog.addImage("dog",dogImg);
    }

    if(foods === 0){
      foods = 20
    }

    drawSprites();
  }
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1;
  }
  database.ref("/").update({
    Food : x
  });
}

function readStock(data){
  foods = data.val();
} 



const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d");

const box=32;

const groundImage=new Image();
groundImage.src="img/ground.png";

const foodImage=new Image();
foodImage.src="img/food.png";

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3"; 


let snake=[];
snake[0]={
    x: 9  * box , 
    y: 10 * box  

}

let food={
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*15+3)*box,
}

let score=0;

let directionPoint;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && directionPoint != "RIGHT"){
        left.play();
        directionPoint = "LEFT";
    }else if(key == 38 && directionPoint != "DOWN"){
        directionPoint = "UP";
        up.play();
    }else if(key == 39 && directionPoint != "LEFT"){
        directionPoint = "RIGHT";
        right.play();
    }else if(key == 40 && directionPoint != "UP"){
        directionPoint = "DOWN";
        down.play();
    }
}


function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


 


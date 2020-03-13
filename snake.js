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
 

// game logic
function draw(){
    if(!isPaused) {
            ctx.drawImage(groundImage,0,0);
            
            for( let i = 0; i < snake.length ; i++){
                ctx.fillStyle = ( i == 0 )? "green" : "white";
                ctx.fillRect(snake[i].x,snake[i].y,box,box);
                
                ctx.strokeStyle = "red";
                ctx.strokeRect(snake[i].x,snake[i].y,box,box);
            }
            
            ctx.drawImage(foodImage, food.x, food.y);
        
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if( directionPoint== "LEFT") snakeX -= box;
            if( directionPoint== "UP") snakeY -= box;
            if( directionPoint== "RIGHT") snakeX += box;
            if( directionPoint== "DOWN") snakeY += box;
            
            // if the snake eats the food
            if(snakeX == food.x && snakeY == food.y){
                score++;
                eat.play();
                food = {
                    x : Math.floor(Math.random()*17+1) * box,
                    y : Math.floor(Math.random()*15+3) * box
                }
                // we don't remove the tail
            }else{
                // remove the tail
                snake.pop();
            }
            
        
            let newHead = {
                x : snakeX,
                y : snakeY
            }
            
            // game over
            if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
            // clearInterval(game);
            console.log("end");
            isPaused=true;
            //setTimeout(location.reload.bind(location), 6000);
            dead.play();
        

            }
            
            snake.unshift(newHead);    
            ctx.fillStyle = "white";
            ctx.font = "45px Changa one";
            ctx.fillText(score,2*box,1.6*box);
        }
        else
        {
            setTimeout(location.reload.bind(location), 2000);
          
        }
}

var isPaused = false;

let game = setInterval(draw,100);

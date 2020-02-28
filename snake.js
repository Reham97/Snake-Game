const cvs=document.getElementById("snake");
const cts=cvs.getContext("2d");

const box=32;

const groundImage=new Image();
groundImage.src="6.png";

const foodImage=new Image();
foodImage.src="";

let snake=[];
snake[0]={
    x: 9 * box , 
    y: 10 * box  

}

let food={
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*15+3)*box,
}

let score=0;

 


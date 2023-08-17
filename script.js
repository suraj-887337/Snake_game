
var lastPaintTime=0;
 let SnakeSpeed=2;
let inputdirection={x:0, y:0};
let EXPENTION_AMOUNT=1;
let lastinputdirection=inputdirection;
let score=0;
 let gameover=false;
const snakeBody=[
    {x:8, y:8},
    // {x:6, y:1},
    // {x:7, y:1},
    // {x:8, y:1},
    // {x:10, y:14}
];

const gameBoard=document.querySelector(".game-board");
const scoreBox=document.getElementById("score");

let food=getfoodrendom();
function Paint(currtime){
   
   var Timeseconds=(currtime-lastPaintTime)/1000;
   requestAnimationFrame(Paint);
   if(Timeseconds< 1 / SnakeSpeed){
      return ;
   }
   lastPaintTime=currtime;
//    console.log(currtime);
     if(gameover!=true){
        update();
        drow();
     }
}
 
window.requestAnimationFrame(Paint);
function update(){
    gameBoard.innerHTML="";
    Snakemove();
    snakeEatefood();
}
function drow(){
     
    drawSnake();
    drawFood();
}

function drawSnake(){
    snakeBody.forEach( (segment, index)=>{
        var snakeElement=document.createElement("div");
        snakeElement.style.gridColumnStart=segment.x;
        snakeElement.style.gridRowStart=segment.y;
        // snakeElement.innerHTML=index;
        snakeElement.style.transform="rotate(0deg)";
        if(index==0){
            snakeElement.classList.add("head");
            if(inputdirection.x==1){
                snakeElement.style.transform="rotate(90deg)";
            }else if(inputdirection.x==-1){
                snakeElement.style.transform="rotate(270deg)";
            }else if(inputdirection.y==-1){
                snakeElement.style.transform="rotate(0deg)"; 
            }else if(inputdirection.y==1){
                snakeElement.style.transform="rotate(180deg)";
            }
            
        }else{
            snakeElement.classList.add("snake");
        }
        // snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });
}
function drawFood(){
    var foodElement=document.createElement("div");
    foodElement.style.gridColumnStart=food.x;
    foodElement.style.gridRowStart=food.y;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}
function Snakemove(){
    inputdirection= getinputdirectio();
    for(i=snakeBody.length-2; i>=0; i--){
        snakeBody[i+1]={...snakeBody[i]}
    }
    snakeBody[0].x +=inputdirection.x;
    snakeBody[0].y +=inputdirection.y;
    // snakeBody[0].y++;
    // getinputdirectio();
    checkgemeover();
}
function getinputdirectio(){
    window.addEventListener("keydown", e=>{
        switch(e.key){

            case 'ArrowUp' : 
                if(lastinputdirection.y==1){
                    break;
                }
            inputdirection ={x:0, y:-1}
            break;
            case 'ArrowDown' : 
            if(lastinputdirection.y==-1){
                break;
            }
             inputdirection ={x:0, y:1}
             break;
            case 'ArrowLeft' : 
            if(lastinputdirection.x==1){
                break;
            }
            inputdirection ={x:-1, y:0}
            break;
            case 'ArrowRight' :
                if(lastinputdirection.x==-1){
                    break;
                }    
            inputdirection ={x:1, y:0}
            break;
            default : inputdirection={x:0, y:0}
        }
    })
    lastinputdirection=inputdirection;
    return  inputdirection;
}

function snakeEatefood(){
       if(iseten()){
        // console.log("eaten");
        score +=10;
        scoreBox.innerHTML=score;
        food=getfoodrendom();
        expandSnake();
        SnakeSpeed++;
       }
}
function iseten(){
    return snakeBody[0].x==food.x && snakeBody[0].y==food.y;
}
function getfoodrendom(){
    let a, b, istrue=true;
    while(istrue){
        a=Math.ceil(Math.random()*16);
        b=Math.ceil(Math.random()*16);
        istrue= snakeBody.some(segment=>{
            return segment.x===a && segment.y===b;

        })
    }
    return { x : a, y: b};
}
function expandSnake(){
        for(let i=0; i<EXPENTION_AMOUNT; i++){
            snakeBody.push(snakeBody[snakeBody.lengh-1]);
        }
}

function checkgemeover(){
    if(snakeoutofgrid() || snakeintersection()){
        
        alert("Game over :you lose");
           gameover=true;
        location.reload();
    }
}
function snakeoutofgrid(){
    return snakeBody[0].x<0 || snakeBody[0].x>16 || snakeBody[0].y<0 || snakeBody[0].y>16;
}
  function snakeintersection(){
          for(i=1; i<snakeBody.length; i++){
               if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y==snakeBody[i].y){
                     return true;
               }
          }
  }

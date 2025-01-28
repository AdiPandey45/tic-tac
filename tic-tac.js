const boxes=document.querySelectorAll(".box");
 const gameinfo=document.querySelector(".game-info");
const newgame=document.querySelector(".btn");


let currentPlayer; 
let gameGrid;

const winningPositions=[
    [0,1,2],   
    [3,4,5],    
    [6,7,8], 
    [1,4,7],
    [2,5,8], 
    [2,4,6],
    [0,3,6],
    [0,4,8]
];
newgame.addEventListener("click",initGame)
function initGame(){
    
    currentPlayer='X';
    boxes.forEach(function(box,index){
        box.innerText="";
        boxes[index].style.pointerEvents="all";

    })
    boxes.forEach(function(box){
        box.classList.remove("win");
    })
    gameGrid=["","","","","","","","",""];
    newgame.classList.remove("active");
    gameinfo.innerHTML=`Current Player - ${currentPlayer}`
    
}
initGame();
boxes.forEach(function(box,index){
    box.addEventListener("click",function(){
        handleCheck(index);
    })
})
 function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer="O"
    }
    else{
        currentPlayer="X";
    }
    gameinfo.innerHTML=`Current Player - ${currentPlayer}` 
   
 }

 function checkGameOver(){
    let answer="";
    winningPositions.forEach(function(position){
        if((gameGrid[position[0]]!== "" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="" )
        && (gameGrid[position[0]]==gameGrid[position[1]]) && (gameGrid[position[1]]==gameGrid[position[2]])  ) {

            if(gameGrid[position[1]]=="X"){
                answer="X"
            }
            else{
                answer="O"
            }
            boxes.forEach(function(box){
                box.style.pointerEvents="none"
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
           
        }
    })
    if(answer !== ""){
        newgame.classList.add("active");
        gameinfo.innerText=`Winner Player - ${answer}`;
      
    }
    if(answer==""){
        newgame.classList.remove("active");
    }
    let fillCount=0;
    gameGrid.forEach(function(box){
        if(box!==""){
            fillCount++;
        }

    })
    if(fillCount==9 && answer==""){
        gameinfo.innerHTML="Game Tied!!";
        newgame.classList.add("active");
    }
 }
function handleCheck(index){
if(gameGrid[index]=== ""){
    boxes[index].innerText=currentPlayer;
    boxes[index].style.pointerEvents="none"; 
    gameGrid[index]=currentPlayer;  
    
    swapTurn();
    checkGameOver();
}
}

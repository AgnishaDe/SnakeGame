// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let lastPaintTime = 0;
let speed=4;
let score=0;
let snakeArr=[
    {x:6, y:7}
];
food= {x:13 , y:15};       //-->food is an object not an array as it is just a particle. Unlike snake it does not have many elements as snake grows everytime eating a food

//Game loop is an important component of javascript: we use this to paint the screen again and again during a game

//Game functions
function main(ctime)
{
    window.requestAnimationFrame(main) ;
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){      //-->till it does not become 1/speed sec it will not paint the screen
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}
function isCollide(snake)
{

    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
function gameEngine()
{

    //Part 1: Updating the snake array & food

    if(isCollide(snakeArr)){
        score = 0; 
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any OK to play again!");
        scoreBox.innerHTML = "Score : " + score;
        snakeArr = [{x: 6, y: 7}];
        musicSound.play();

    }
     
    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        //Adds element at the starting of array
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        if(score<=5)
        speed=4;
        else if(score>5 && score<=10)
        {
            speed=6;
        }
        else if(score>10 && score<=15)
        {
            speed=8;
        }
        else if(score>15 && score<=20)
        {
            speed=10;
        }
        else
        speed=12;
 
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});  //-->as snake will eat its body segment will increase in that direction
        
        //now we will update foods location
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}

    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};        //-->we have to apply destructuring and make it equal to a new object so that we dont have referencing problem
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
 



    //Part 2: Display the snake and Food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

        //Display the Food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

    });

}



//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main)    //-->accepts a function as parameter

//addEvent listener has 2 arrguements  : one is event and one is arrow function
window.addEventListener('keydown', e => {               //-->whenever there is a key press this arrow function will run. 
     inputDir = {x:0, y:1};  //Start the game, sanke will move downward
     musicSound.play();

     moveSound.play();
     switch (e.key) {         //-->e is the event which is fired   and .key will tell us which key it is
        
            case "ArrowUp":
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
                break;
    
            case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;
    
            case "ArrowLeft":
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
                break;
    
            case "ArrowRight":
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default:
                break;
     }
})



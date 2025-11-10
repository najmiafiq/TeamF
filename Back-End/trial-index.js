document.addEventListener("DOMContentLoaded", ()=>{
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    //Identify the size of canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    let score = 0;
    let gameInterval;
    let isGameRunning = false;

    // Display the text of start game or end game
    const displayMessage = (param) => {
        context.fillStyle='white';
        context.globalAlpha=0.75;
        context.fillRect(0,canvasHeight/2-30, canvasWidth, 60);
        context.globalAlpha = 1;
        context.fillStyle="black";
        context.font="35px Silkscreen";
        context.textAlign="center";
        context.textBaseline="middle";
        context.fillText(param, canvasWidth/2, canvasHeight/2);

    };

    document.getElementById("start-game").textContent = displayMessage("Press Any Key To Start");
    

    //Initiate the start of the game by clicking any key
    window.addEventListener("keydown", (e)=> {
        if(!isGameRunning){
            isGameRunning = true;
            score = 0;
            bullet.array = [];
            updateScore();
            createInvaders();
            gameInterval = setInterval(gameLoop, 10) 
            
        }
    })

    function gameLoop(){
        draw();
    }

    function draw(){
        //clear the text after pressing any key
        context.clearRect(0,0, canvasWidth, canvasHeight);

        drawPlayer();
        movePlayer();

        drawBullet();
        moveBullet();

        drawInvaders();
        moveInvaders();

        checkCollision();
    }

    //instance of player
    const player = {
        width:50,               //width of player
        height:30,              //height of player
        x:canvasWidth/2-25,     //current x-location
        y:canvasHeight-40,      //current y-location
        speed: 3,               //speed of player moving
        dx: 0,                  //moving x-location
        color: "blue",          //color of player
    }

    //Function to draw the playe's invader
    function drawPlayer(){
        context.fillStyle=player.color;
        context.fillRect(
            player.x+16.5, 
            player.y-player.height/2, 
            player.width/3, 
            player.height
        )
        context.fillRect(player.x, player.y, player.width, player.height/2)
    }

    //Function to move the player's invader
    function movePlayer(){
        player.x+=player.dx;
        
        //if the player exceed the screen on the left side, it will set x=0
        if(player.x < 0){
            player.x = 0;
        }
        //if the player exceed the screen on the right side, it will set x=canvasWidth
        if(player.x + player.width > canvasWidth){
            player.x = canvasWidth - player.width;
        }
    }


    //When pressing the key
    document.addEventListener("keydown", (e) => {
        if(isGameRunning){
            if(e.key === "ArrowRight"){
                player.dx = player.speed;
            }else if(e.key === "ArrowLeft"){
                player.dx =- player.speed;
            }else if(e.key === " "){
                bullet.array.push({
                    x: player.x + player.width/2 - bullet.width/2,
                    y:player.y, 
                })
            }
        }
    })

    //instance of bullet
    const bullet={
        width:5,
        height:10,
        speed:10,
        color:"yellow",
        array:[],
    };

    //Function to draw the bullet
    function drawBullet(){
        context.fillStyle = bullet.color;
        bullet.array.forEach((b) => {
            context.fillRect(b.x, b.y, bullet.width, bullet.height);
        })
    }

    //Function to remove bullet if it shoot exceed the screen
    function moveBullet(){
        bullet.array.forEach((b, index) => {
            b.y -= bullet.speed;
            if(b.y + bullet.height < 0){
                bullet.array.splice(index, 1);
            }
        })
    }

    //When releasing the key
    document.addEventListener("keyup", (e) => {
        if(e.key === "ArrowRight" || e.key === "ArrowLeft"){
            player.dx = 0;
        }
    })

    //instance of invader
    const invader = {
        width: 40,
        height: 20,
        row: 5,
        column: 10,
        array: [],
        speed: 1,
        dx: 1,
        dy:20,
        down: false,
        color: "red",
    };

    //Function to create the invaders depend on the number of rows and columns and set status to 1
    function createInvaders(){
        invader.array=[];
        for(let row=0; row<invader.row; row++){
            for(let col = 0; col<invader.column; col++){
                invader.array.push({
                    x: col * (invader.width + 10) + 30,
                    y: row * (invader.height + 10 ) + 30,
                    status: 1,
                });
            }
        }
    }

    //Function to design the invader by filling in colour, width and height
    function drawInvaders(){
        context.fillStyle = invader.color;
        invader.array.forEach((inv) => {
            if(inv.status === 1){
                context.fillRect(inv.x, inv.y, invader.width, invader.height);
            }
        })
    }

    //Function to move the invader from left to right or right to left
    function moveInvaders(){
        invader.array.forEach((inv)=>{
            if(inv.status === 1){
                inv.x += invader.dx;
            }
        })

        const hitLeftWall = invader.array.some(
            (inv) => inv.status === 1 && inv.x < 0 
        );

        const hitRightWall = invader.array.some(
            (inv) => inv.status === 1 && inv.x + invader.width > canvasWidth
        );

        if(hitLeftWall || hitRightWall){
            invader.dx *= -1;
            invader.down = true;
        }

        if(invader.down){
            invader.array.forEach((inv)=>{
                if(inv.status === 1){
                    inv.y += invader.dy;
                }
            });
            invader.down = false;
        }

    }

    //Check if the bullet hit the invader
    function checkCollision(){
        bullet.array.forEach((b, bIndex) =>{
            invader.array.forEach((inv, Iindex) => {
                if(
                    inv.status === 1 &&
                    b.x < inv.x + invader.width &&
                    b.x + bullet.width > inv.x &&
                    b.y < inv.y + invader.height &&
                    b.y + bullet.height > inv.y
                ){
                    inv.status = 0;
                    bullet.array.splice(bIndex, 1);
                    score += 100;
                    updateScore();
                }
            })
        })

        invader.array.forEach((inv) => {
            if(inv.status === 1 && inv.y+invader.height>player.y){
                clearInterval(gameInterval);
                displayMessage("Game Over!");
                isGameRunning = false;
            }
        })

        if(invader.array.every((inv) => inv.status === 0)){
            clearInterval(gameInterval);
            displayMessage("Game Complete!");
            isGameRunning = false;
        }  
    }

    //Update the score of the player
    function updateScore(){
        document.getElementById("game-score-visible").textContent = score;
    }
})
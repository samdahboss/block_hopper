let canvasWidth = 1200
let canvasHeight = 500

let player;
let playerYposition=150;

let block;
let blockYposition=canvasHeight;

let score=0
let scoreLabel;
function startGame(){
    gameCanvas.start()
    player = new createPlayer(30,30,50);
    block = new createBlock(20,350,10);
    scoreLabel = new scoreTag(1000,40)
}
let gameCanvas={
    canvas: document.createElement('canvas'),
    start: function(){
        this.canvas.width = canvasWidth
        this.canvas.height = canvasHeight
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas,document.body.childNodes[0])
    }
}




class createPlayer{
    constructor(width,height,x){
        this.width = width;
        this.height =height;
        this.x= x;
        this.y=playerYposition;
        this.isJumping = false;
        this.jumpSpeed;
        this.fallSpeed;
    }
    draw(){
        let ctx=gameCanvas.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    fall(){
        if(this.y<300){
            this.fallSpeed=4
            this.y += this.fallSpeed;
            this.stopPlayer()
        }else{
            this.fallSpeed=2
            this.y += this.fallSpeed;
            this.stopPlayer()
        }
        
    }
    jump(){
        if(this.y == canvasHeight-this.height){
            this.jumpSpeed=400
            this.y-=this.jumpSpeed
        }else if(!this.isJumping && this.y<500){
            this.jumpSpeed=100
            this.y-=this.jumpSpeed
            this.resetJump()
        }
    }
    resetJump(){
        this.isJumping=false;
    }
    stopPlayer(){
        let ground = canvasHeight - this.height;
        if(this.y > ground){
            this.y = ground;
            this.resetJump()
        }
    }
}
class createBlock{
    constructor(width,height,speed){
        this.width = randomNumber()*width
        this.height=randomNumber()*height+100
        this.speed = randomNumber()*speed+50
        this.x= canvasWidth
        this.y= canvasHeight-this.height
    }
    draw(){
        let ctx= gameCanvas.context;
        ctx.fillStyle="green"
        ctx.fillRect(this.x,this.y,(this.width-30),(this.height))
    }
    attackPlayer(){
        if (this.x < 0){
            score ++
            this.returnToAttackPosition()
        }else{
            this.x-=this.speed
        }      
    }
    returnToAttackPosition(){
        block = new createBlock(20,150,5);
    }
}
class scoreTag{
    constructor(x,y){
        this.score=0
        this.x=x
        this.y=y
    }
    draw(){
        let ctx=gameCanvas.context;
        ctx.fillStyle="Black"
        ctx.font= "25px cursive"
        ctx.fillText(`Score: ${score}`, this.x,this.y)
    }
    
}

function randomNumber(){
    return Math.random()
}


let interval = setInterval(updateCanvas, 20);
let hasCollided=false

function detectCollision(){
    let playerLeft = player.x;
    let playerRight = player.x+player.width

    let blockLeft = block.x
    let blockRight = block.x + block.width

    let playerBottom = player.y + player.height
    let blockTop = block.y
    if(playerRight>blockLeft &&
       playerBottom>blockTop ){
            console.log(playerRight, "--pr")
            console.log(playerLeft, "--pl")
            console.log(blockLeft,"--bl")
        hasCollided=true;
        clearTimeout(interval)
    }
}


function updateCanvas(){
    let ctx = gameCanvas.context;
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    block.draw()
    block.attackPlayer()

    player.fall();
    player.draw();

    scoreLabel.draw()

    detectCollision()
}

document.addEventListener('keydown', function(event){
    if(event.key === ' '){
        player.jump()
    }
})


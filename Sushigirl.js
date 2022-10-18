const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const imageMaki = new Image ();
imageMaki.src = "./images/maki.png";
let score = 0
let stopGame = false
let obstaculosArray = []

window.onload = ()=> {
    document.getElementById('start-button').onclick = ()=> {
        startGame ();
    };
}

function startGame(){
    update ()
}

class Maki {
    constructor (){
        this.x = 70
        this.y = 250
        this.speed= 1
        this.w = 70
        this.h = 100
    }
        drawMaki (){
            ctx.drawImage (imageMaki,this.x,this.y,this.w,this.h)
        }
    
        moveUp (){
            if (this.y<=this.h || stopGame === true){
                return
            }
            this.y-=this.h
        }
        moveDown(){
            if(this.y>=canvas.height-200||this.stopGame===true){
            return
        }
            this.y+= this.h
        }
        contains(b){
            return (this.x < b.x + b.w) &&
            (this.x + this.w > b.x) &&
            (this.y < b.y + b.h) &&
            (this.y + this.h > b.y)
          }
    }

    let maki = new Maki

document.addEventListener ("keydown",(e)=> {
    console.log(e);
    if (e.keyCode === 38){
        maki.moveUp ()
        maki.drawMaki ()
    } else if (e.keyCode === 40){
        maki.moveDown ()
        maki.drawMaki ()
    }
})

class Obstaculo {
    constructor (color){
        this.x = 700
        this.y= Math.random ()*canvas.height
        this.color = color
        this.speed = 1
        this.w =50
        this.h =30
        this.move = true
    }
    
    drawObstaculo (){
        if (this.x <= 0 && this.move === true){
            score++
            this.move = false;
        }
        this.x -=this.speed
        ctx.fillStyle = this.color
        ctx.fillRect (this.x-=1,this.y, this.w,this.h)
    }
}

let obstacles = new Obstaculo

 setInterval(()=> {
    let n= Math.floor(Math.random()*2)
    if(n===0){
        obstaculosArray.push(new Obstaculo("pink"))
    } else if(n===1){
        obstaculosArray.push(new Obstaculo("green"))
    }
},3000)
  

const drawScore=()=>{
    ctx.font = "20px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(score,canvas.width/2,200);
  }
  
  const drawGameOver=()=>{
    let gameOver= "Game Over!"
    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(gameOver +`Your final score is ${score}`,100,100)
  }

  const update = () => {
        if (!stopGame) {
        ctx.clearRect (0,0,canvas.width,canvas.height)
        maki.drawMaki();

        for (let i =0; i< obstaculosArray.length;i++){
          obstaculosArray[i].drawObstaculo()  
          if (maki.contains(obstaculosArray[i])){
            stopGame =true;
          }
          drawScore ()
        }
        
    } else {
        drawGameOver ()
    }
    requestAnimationFrame (update)
    }

//const checkObjEaten = (obs,b) => {
    //return (obs.contains (b))


const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const imageMaki = new Image ();
imageMaki.src = "./images/sushigirl.png";

const onigiri = new Image ();
onigiri.src = "./images/onigiri2.png";

const wasabi = new Image ();
wasabi.src = "./images/wasabi.png";

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
        this.h = 70
        
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
    constructor (tipo){
        this.x = 700
        this.y= Math.random ()*canvas.height
        this.speed = 3
        this.w =70
        this.h =70
        this.tipo = tipo
        this.collition=false
    }
    
    drawObstaculo (){
        this.x -=this.speed
        if(this.tipo === "wasabi"){
            ctx.drawImage (wasabi,this.x,this.y,this.w,this.h)
        } else if(this.tipo === "onigiri"){
            ctx.drawImage (onigiri,this.x,this.y,this.w,this.h)
        }
    }
}

 setInterval(()=> {
    let n= Math.floor(Math.random()*2)
    if(n===0){
        obstaculosArray.push(new Obstaculo("onigiri"))
    } else if(n===1){
        obstaculosArray.push(new Obstaculo("wasabi"))
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
            if(maki.contains(obstaculosArray[i])){
                if (obstaculosArray[i].tipo ==="wasabi"){
                    stopGame = true;
                    drawGameOver ()
                } else if(obstaculosArray[i].tipo === "onigiri" && obstaculosArray[i].collition === false){
                    score+=100
                    obstaculosArray[i].collition=true
                }
            }
            drawScore()
        }
        requestAnimationFrame(update)
    }
}


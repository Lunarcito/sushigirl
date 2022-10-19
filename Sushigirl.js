const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const sushigirl = new Image ();
sushigirl.src = "./images/sushigirl.png";

const maki = new Image ();
maki.src = "./images/maki.png"


const onigiri = new Image ();
onigiri.src = "./images/onigiri2.png";

const wasabi = new Image ();
wasabi.src = "./images/wasabi.png";

let score = 0
let lifes = 3
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

class Sushi {
    constructor (){
        this.x = 70
        this.y = 300
        this.speed= 1
        this.w = 70
        this.h = 70
        
    }
        drawSushi (){
            ctx.drawImage (sushigirl,this.x,this.y,this.w,this.h)
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

    let sushi = new Sushi

document.addEventListener ("keydown",(e)=> {
    console.log(e);
    if (e.keyCode === 38){
        sushi.moveUp ()
        sushi.drawSushi ()
    } else if (e.keyCode === 40){
        sushi.moveDown ()
        sushi.drawSushi ()
    }
})

class Obstaculo {
    constructor (tipo){
        this.x = 800
        this.y= Math.random ()*canvas.height-100
        this.speed = 4
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
        } else if (this.tipo === "maki"){
            ctx.drawImage (maki,this.x,this.y,this.w,this.h)
       }
    }
}

 setInterval(()=> {
    let n= Math.floor(Math.random()*3)
    if(n===0){
        obstaculosArray.push(new Obstaculo("onigiri"))
    } else if(n===1){
        obstaculosArray.push(new Obstaculo("wasabi"))
    } else if(n===2){
        obstaculosArray.push(new Obstaculo("maki"))
    }
},1500)
  

const drawScore=()=>{
    ctx.font = "20px Arial";
    ctx.fillStyle = "purple";
    ctx.fillText("Score: "+ score,750,150);
  }
const drawLifes=()=>{
    ctx.font = "20px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText("Lives: "+lifes,750,100);
  }
  
  const drawGameOver=()=>{
    let gameOver= "Game Over!"
    ctx.font = "40px Arial";
    ctx.fillStyle = "purple";
    ctx.fillText(gameOver +`Your final score is ${score}`,100,100)
  }

  const update = () => {
    if (!stopGame) {
        ctx.clearRect (0,0,canvas.width,canvas.height)
        sushi.drawSushi();
        for (let i =0; i< obstaculosArray.length;i++){
            obstaculosArray[i].drawObstaculo()
            if(sushi.contains(obstaculosArray[i])){
                if (obstaculosArray[i].tipo ==="wasabi"&& obstaculosArray[i].collition === false){
                    if(lifes >1){
                    lifes--;  
                    obstaculosArray[i].collition=true
                    } else {
                        lifes--;
                        return drawGameOver ()
                    }
                
                } else if(obstaculosArray[i].tipo === "onigiri" && obstaculosArray[i].collition === false){
                    score+=100                    
                    obstaculosArray[i].collition=true
                } else if(obstaculosArray[i].tipo === "maki" && obstaculosArray[i].collition === false){
                    score+=500;
                    obstaculosArray[i].collition=true
                }
            }
            drawLifes ()
            drawScore()
        }
        requestAnimationFrame(update)
    }
}


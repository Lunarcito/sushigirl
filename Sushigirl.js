const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const biteSound = new sound ("./music/bitesound.wav");
const backgroundSound = new sound ("./music/backgroundsound.wav");
const sushigirl = new Image ();
sushigirl.src = "./images/sushigirl.png";

const maki = new Image ();
maki.src = "./images/maki.png"

const onigiri = new Image ();
onigiri.src = "./images/onigiri2.png";

const nigiri = new Image ();
nigiri.src = "./images/nigiri.png";

const wasabi = new Image ();
wasabi.src = "./images/wasabi.png";

let score = 0
let lifes = 3
let stopGame = false
let obstaculosArray = []

//DOM ELements
const startButton = document.getElementById("start-button");
const canvashidden = document.getElementById ("canvas");
const instructionshidden = document.getElementById ("instructions");
const gameOverPage = document.getElementById("gameOver");
const titlehidden = document.getElementById("title");  
const arrowUp = document.getElementById("arrow-up");
const arrowDown = document.getElementById("arrow-down");
const contenedor = document.getElementById("contenedor");

window.onload = ()=> {
    document.getElementById('start-button').onclick = ()=> {
        startGame ();
    };
}

function sound(src){
    this.sound=document.createElement ("audio");
    this.sound.src=src;
    this.sound.setAttribute("preload","auto");
    this.sound.setAttribute("controls","none");
    this.sound.style.display = "none";
    document.body.appendChild (this.sound)
    this.play=function(){
        this.sound.play()
    }
    this.stop=function(){
        this.sound.pause();
    }
}
function startGame(){
    update ()
}

class Sushi {
    constructor (){
        this.x = 70
        this.y = 300
        this.speed= 1
        this.w = 109
        this.h = 80
        this.moving = true
        
    }
        drawSushi (){

            ctx.drawImage (sushigirl,this.x,this.y,this.w,this.h)
        }
    
        moveUp (){
            if (this.y<=this.h || this.stopGame || !this.moving){
                return
            }
            this.y-=this.h
        }
        moveDown(){
            if(this.y>=canvas.height-200 || this.stopGame || !this.moving){
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


class Obstaculo {
    constructor (tipo){
        this.x = 800
        this.y= Math.random ()*(canvas.height-70)
        this.speed = 6
        this.w =90
        this.h =75
        this.tipo = tipo
        this.collition=false       

    }
    
    drawObstaculo (){
        this.x -=this.speed
        if(this.tipo === "wasabi" && this.collition=== false){
           ctx.drawImage (wasabi,this.x,this.y,this.w,this.h)
        } else if(this.tipo === "onigiri" && this.collition=== false){
            ctx.drawImage (onigiri,this.x,this.y,this.w,this.h)
        } else if(this.tipo === "nigiri" && this.collition=== false){
            ctx.drawImage (nigiri,this.x,this.y,this.w,this.h)
        } else if (this.tipo === "maki" && this.collition=== false){
            ctx.drawImage (maki,this.x,this.y,this.w,this.h)
       }
    }
}

 setInterval(()=> {
    let n= Math.floor(Math.random()*4)
    if(n===0){
        obstaculosArray.push(new Obstaculo("onigiri"))
    } else if(n===1){
        obstaculosArray.push(new Obstaculo("wasabi"))
    } else if(n===2){
        obstaculosArray.push(new Obstaculo("maki"))
    } else if(n===3){
        obstaculosArray.push(new Obstaculo("nigiri"))
    }
},500)
  

const drawScore=()=>{
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+ score,700,150);
  }
const drawLifes=()=>{
    ctx.font = "30px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText("Lives: "+lifes,700,100);
  }
  
  const drawGameOver=()=>{
    let gameOver= "Game Over!"
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillRect = "blue"
    ctx.fillText("     " +`Your final score is ${score}`,100,100)
  }

  document.addEventListener ("keydown",(e)=> {
    console.log(e);
    if (!stopGame) {
        if (e.keyCode === 38){
            sushi.moveUp ()
            sushi.drawSushi ()
        } else if (e.keyCode === 40){
            sushi.moveDown ()
            sushi.drawSushi ()
        }
    }
})

startButton.addEventListener("click", ()=>{
    console.log( "clicki")

    canvashidden.classList.remove("canvasFondoMenu")
    canvashidden.classList.add("canvasFondoJuego")

    canvashidden.classList.remove ("hidden")
    startButton.classList.add ("hidden")
    titlehidden.classList.add ("hidden")
    instructionshidden.classList.add ("hidden")
    arrowUp.classList.add ("hidden")
    arrowDown.classList.add ("hidden")
    contenedor.classList.add ("hidden")

})

  const update = () => {    
    if (!stopGame) {
        ctx.clearRect (0,0,canvas.width,canvas.height)
        sushi.drawSushi();
        
        for (let i =0; i< obstaculosArray.length;i++){
            obstaculosArray[i].drawObstaculo()
            if(sushi.contains(obstaculosArray[i])){
                if (obstaculosArray[i].tipo ==="wasabi"&& obstaculosArray[i].collition === false){
                    biteSound.play();
                    if(lifes >1){
                    lifes--;  
                    obstaculosArray[i].collition=true
                    } else {
                        stopGame=true
                        gameOverPage.classList.remove ("hidden")
                        drawGameOver ()
                                        
                    }
                } else if(obstaculosArray[i].tipo === "onigiri" && obstaculosArray[i].collition === false){
                    biteSound.play();
                    score+=100
                    backgroundSound.play()                                       
                    obstaculosArray[i].collition=true
                } else if(obstaculosArray[i].tipo === "nigiri" && obstaculosArray[i].collition === false){
                    biteSound.play();
                    score+=200
                    backgroundSound.play()                                       
                    obstaculosArray[i].collition=true
                } else if(obstaculosArray[i].tipo === "maki" && obstaculosArray[i].collition === false){
                    obstaculosArray[i].collition=true                    
                } else if (obstaculosArray[i].tipo === "maki" && obstaculosArray[i].collition === true){
                    biteSound.play();
                    sushi.moving = false
                    setTimeout(() => {
                        sushi.moving = true
                    },3000)
                    
                }
            }
            
            drawLifes ()
            drawScore()
            
        }
        requestAnimationFrame(update)
    }
}



const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const biteSound = new sound ("./music/bitesound.wav");
const extrascoreSound = new sound ("./music/extrascoreSound.wav");
const gameSound = new sound ("./music/gameSound.mp3");

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
const contenedorImagenes = document.getElementById("contenedorimagenes")

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

    canvashidden.classList.remove("canvasFondoMenu")
    canvashidden.classList.add("canvasFondoJuego")
    canvashidden.classList.remove ("hidden")
    startButton.classList.add ("hidden")
    titlehidden.classList.add ("hidden")
    instructionshidden.classList.add ("hidden")
    arrowUp.classList.add ("hidden")
    arrowDown.classList.add ("hidden")
    contenedor.classList.add ("hidden")
    contenedorImagenes.classList.add ("hidden")

}

class Sushi {
    constructor (){
        this.x = 70
        this.y = 300
        this.speed= 1
        this.w = 150
        this.h = 100
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
        this.x = canvas.width
        this.y= Math.random ()*(canvas.height-70)
        this.speed = 8
        this.w =135
        this.h =112.5
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

const drawScore=()=>{
    ctx.font = "30px DynaPuff";
    ctx.fillStyle = "white";
    ctx.fillText("??? Score: "+ score,1300,150);
  }
const drawLifes=()=>{
    ctx.font = "30px DynaPuff";
    ctx.fillStyle = "brown";
    ctx.fillText("??? Lives: "+lifes,1300,100);
  }
  
  const drawGameOver=()=>{
    ctx.font = "40px DynaPuff";;
    ctx.fillStyle = "white";
    ctx.fillText(`Your final score is ${score}`,600,700)
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

  const update = () => {    
    gameSound.play()
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
                    extrascoreSound.play()                                       
                    obstaculosArray[i].collition=true
                } else if(obstaculosArray[i].tipo === "nigiri" && obstaculosArray[i].collition === false){
                    biteSound.play();
                    score+=200
                    extrascoreSound.play()                                       
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
// variaveis

//elemento de audio

const audio = new Audio("sons/carSound1.mp3");

//elemento dos modais

const conteinerInicioJogo = document.querySelector(".modalInicioJogo");
const modalGameOver = document.querySelector(".gameOver");
const modalIniciojogo = document.querySelector(".inicioJogo");
const btnInicioJogo = document.querySelector("#botaoInicioJogo");

//elementos do painel de jogo

const modalScore = document.querySelector(".score");
const scorePontuacao = document.querySelector("#pontuacao");
const scoreRecorde = document.querySelector("#recorde");
const painelJogo = document.querySelector(".painelJogo");
const carMaquinaLeft = document.querySelector("#carMaquinaLeft");
const carMaquinaRight = document.querySelector("#carMaquinaRigth");
const carPlayer = document.querySelector("#carPlayer");

// variaveis operacionais

let left = false;
let pontuação = 0;
let contPontuacao = 0;
let loop;
// eventos

btnInicioJogo.addEventListener("click", iniciaJogo);


// funções

function iniciaJogo() {
    modalIniciojogo.style.display = "none";
    carPlayer.style.display = "flex";
    modalScore.style.display = "flex";
    iniciaAudio();
    lancarCar();
    document.addEventListener("keydown", carPlayerMoove);
    loop = setInterval(loopJogo, 10);
    
}

function iniciaAudio(){
    audio.loop = true;
    audio.play();
}

function carPlayerMoove(event) {
    if(event.key === "ArrowLeft"){
        if(left === false){
            carPlayer.style.animation = "animationCarPlayerLeft .2s forwards ease"
            left = true;
        }
    }else if(event.key === "ArrowRight"){
        if(left === true){
            carPlayer.style.animation = "animationCarPlayerRigth .2s forwards ease"
            left = false;
        }
    }
    
}
function loopJogo() {
    scorePontuacao.textContent = `${contPontuacao/100}`;
    let posicaoCarRigth = +getComputedStyle(carMaquinaRight).marginTop.replace("px", "");
    let posicaoCarLeft = +getComputedStyle(carMaquinaLeft).marginTop.replace("px", "");
    console.log(posicaoCarRigth);

    contPontuacao += 10;
}

function lancarCar() {
    carMaquinaRight.style.animation = "animationCarMaquina 2.2s infinite linear";
    setTimeout(()=>{
        carMaquinaLeft.style.animation = "animationCarMaquina 2.2s infinite linear";
    },1100);
}

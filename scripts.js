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

// eventos

btnInicioJogo.addEventListener("click", iniciaJogo);


// funções

function iniciaJogo() {
    modalIniciojogo.style.display = "none";
    carPlayer.style.display = "flex";
    modalScore.style.display = "flex";
    iniciaAudio();
    document.addEventListener("keydown", carPlayerMoove);
}

function iniciaAudio(){
    audio.loop = true;
    audio.play();
}

function carPlayerMoove(event) {
    if(event.key === "ArrowLeft"){
        if(left === false){
            carPlayer.style.animation = "animationCarPlayerLeft .4s forwards ease"
            left = true;
        }
    }else if(event.key === "ArrowRight"){
        if(left === true){
            carPlayer.style.animation = "animationCarPlayerRigth .4s forwards ease"
            left = false;
        }
    }
    
}
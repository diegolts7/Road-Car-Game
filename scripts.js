// variaveis

//elemento de audio

const audio = new Audio("sons/carSound1.mp3");
const audioBatida = new Audio("sons/carColision.mp3");

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

let recorde = localStorage.getItem("recorde") !== null ? Number(localStorage.getItem("recorde")) : 0 ;
scoreRecorde.textContent = `${recorde}`;

let contPontuacao = 0;
let loop;

// eventos

btnInicioJogo.addEventListener("click", iniciaJogo);
modalGameOver.addEventListener("click", reiniciaJogo);


// funções

// funçao que inicia os modais e carros e, além de criar o intervalo loop

function iniciaJogo() {

    modalIniciojogo.style.display = "none";
    carPlayer.style.display = "flex";
    modalScore.style.display = "flex";
    iniciaAudio();
    lancarCar();
    loop = setInterval(loopJogo, 10);
    
}

// funçoes de iniciação dos sons

function iniciaAudio(){

    audio.loop = true;
    audio.play();
}
function iniciaAudioBatidad() {

    audioBatida.play();
}

// função responsavel por realizar a movimentação do carro do jogador de acordo com o clique na seta do teclado

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

// função que encorpora o loop e os elementos que precisam ser testados a todo momento

function loopJogo() {

    scorePontuacao.textContent = `${contPontuacao/100}`;  // atualiza a pontuação

    document.addEventListener("keydown", carPlayerMoove);

    // pega as posiçoes dos carros e converte para numero

    let posicaoCarRigth = +getComputedStyle(carMaquinaRight).marginTop.replace("px", "");  
    let posicaoCarLeft = +getComputedStyle(carMaquinaLeft).marginTop.replace("px", "");
    let posicaoCarPlayer = +getComputedStyle(carPlayer).marginLeft.replace("px", "");

    // testa se a posição dos carro teve choque - sistema de colisões

    if((posicaoCarRigth >= 385 && left === false) || (posicaoCarLeft >= 385 && left === true)){

        iniciaAudioBatidad();

        if(!left){

            carMaquinaRight.style.marginTop = `${posicaoCarRigth}px`;
            carMaquinaLeft.style.marginTop = `${posicaoCarLeft}px`;
            carPlayer.style.marginLeft = `${posicaoCarPlayer}px`;
            gameOver();
        }else{

            carMaquinaLeft.style.marginTop = `${posicaoCarLeft}px`;
            carMaquinaRight.style.marginTop = `${posicaoCarRigth}px`;
            carPlayer.style.marginLeft =`${posicaoCarPlayer}px`;
            gameOver();
        }
    }
    contPontuacao += 10;  // atualiza parametro de referencia para a pontução
}

// função que faz o lançamentos dos carros da maquina com um intervalo entre eles

function lancarCar() {

    carMaquinaRight.classList.add("animation");

    setTimeout(()=>{
        carMaquinaLeft.classList.add("animation");
    },1100);
}

// função de encerramento quanda há uma colisão

function gameOver() {

    carMaquinaRight.classList.remove("animation");
    carMaquinaLeft.classList.remove("animation");
    carPlayer.src = "img/carPlayerColision.png";

    // atualiza o recorde

    if((contPontuacao/100) >= recorde){
        recorde = contPontuacao/100;
        scoreRecorde.textContent = `${recorde}`;

        // atualiza o recorde no LocalStorage

        localStorage.setItem("recorde", `${recorde}`);
    }

    contPontuacao = 0;
    audio.pause();
    clearInterval(loop);       //limpa o intervalo
    modalGameOver.style.display = "flex";    
}

// atribui os valores iniciais dos elementos para o reinicio do jogo

function reiniciaJogo(){

    carPlayer.src = "img/carPlayer.png";
    modalGameOver.style.display = "none";
    modalIniciojogo.style.display = "flex";
    carPlayer.style.display = "none";
    modalScore.style.display = "none";
    carMaquinaLeft.style.marginTop = "-12vh";
    carMaquinaRight.style.marginTop = "-12vh";

}
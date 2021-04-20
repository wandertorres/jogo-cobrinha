let canvas = document.getElementById("cobra");
let context = canvas.getContext("2d");
const box = 32;

let cobra = [];
let comida = {};
let direcao = "right";

cobra[0] = {
    x: 8 * box,
    y: 8 * box
}

comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

document.addEventListener("keydown", definirDirecao);

function definirDirecao(event) {
    if(event.keyCode == 37 && direcao != "right") direcao = "left";
    if(event.keyCode == 38 && direcao != "down") direcao = "up";
    if(event.keyCode == 39 && direcao != "left") direcao = "right";
    if(event.keyCode == 40 && direcao != "up") direcao = "down";
}

function criarFundo() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra() {
    for(i = 0; i < cobra.length; i++) {
        context.fillStyle = "green";
        context.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}

function criarComida() {
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);
}

function moverCobra() {
    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if(direcao == "right") cobraX += box;
    if(direcao == "left") cobraX -= box;
    if(direcao == "up") cobraY -= box;
    if(direcao == "down") cobraY += box;

    if(cobraX != comida.x || cobraY != comida.y) {
        cobra.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: cobraX,
        y: cobraY
    } 
    
    cobra.unshift(newHead);
}

function tocarParede() {
    if(cobra[0].x > 16 * box | cobra[0].x < 0 | cobra[0].y > 16 * box | cobra[0].y < 0) return true;
}

function tocarCorpo() {
    for(i = 1; i < cobra.length; i++) {
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y) return true;
    }
}

function gameOver() {
    clearInterval(jogo);
    alert("Game over!");
}

function iniciarJogo() {
    criarFundo();
    criarCobra();
    criarComida();
    moverCobra();

    if(tocarCorpo() | tocarParede()) gameOver();
}

let jogo = setInterval(iniciarJogo, 500);
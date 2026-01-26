
const areaMapa = document.querySelector('#area');

const listaAcoes = [];

const Jogador = {
    y: 0,
    x: 0,
    anguloAtual: 90,
   
   
    arrumaAngulo: function(){
        if (Jogador.anguloAtual <= -360){
            Jogador.anguloAtual = 0;
        }
        else if (Jogador.anguloAtual >=360){
            Jogador.anguloAtual = 0;
        }
    },
    rotacionarE: function () {
        
        celulaJogador= document.querySelector(".jogador");
        Jogador.anguloAtual-=90;
        Jogador.arrumaAngulo();
        celulaJogador.style.transform = `rotate(${Jogador.anguloAtual}deg)`;
        console.log(Jogador.anguloAtual);

    },
    rotacionarD: function () {
        
        celulaJogador= document.querySelector(".jogador");
        Jogador.anguloAtual+=90;
        Jogador.arrumaAngulo();
        celulaJogador.style.transform = `rotate(${Jogador.anguloAtual}deg)`;
        console.log(Jogador.anguloAtual);
    },
    andar: function(){
        angl = Math.abs(Jogador.anguloAtual);
        switch (angl){
              case 0:
                if (Jogador.x+1<= 49) {Jogador.x++};
                break
            case 90:
                if (Jogador.y-5>= 0) {Jogador.y-=5};
                break
            case 180:
                if (Jogador.x-1>=0) {Jogador.x--};
                break
            case 270:
                if (Jogador.y+5<=49) {Jogador.y+=5};
                break
            
        }
        
        atualizarPos();
    }

}
const Mapa = {
    tam: 50,
    checkpoint:47 ,
    area: areaMapa,
    desenharMapa: function () {
        areaMapa.innerHTML = "";
        for (let i = 0; i < Mapa.tam; i++) {
                const celula = document.createElement("span");
                celula.classList.add("celula");
                celula.id = `celula-${i}`;
                areaMapa.appendChild(celula);
        }
        document.getElementById(`celula-${Mapa.checkpoint}`).style.backgroundImage ="url(https://i.pinimg.com/736x/7a/25/27/7a2527042f10403dbbe74146e93640b7.jpg)";
    },
    desenharJogador: function(x,y,anguloAtual){
        Jpos = x + y;
        celulaJogador= document.getElementById(`celula-${Jpos}`);
        const imgJogador = document.createElement("span");
        imgJogador.classList = ("jogador");
        celulaJogador.appendChild(imgJogador);
        imgJogador.style.transform = `rotate(${anguloAtual}deg)`;
        if (Jpos == Mapa.checkpoint){
            alert("Voce ganhou!");
        }
    }
    
}
function salE (){ 
    listaAcoes.push("0");
    caixaAcoes = document.querySelector(".caixaacoes");
    imgbotE = document.createElement("span");
    imgbotE.id = "rotaE";
    caixaAcoes.appendChild(imgbotE);
}
function salD(){ 
    listaAcoes.push("1");
    caixaAcoes = document.querySelector(".caixaacoes");
    imgbotD = document.createElement("span");
    imgbotD.id = "rotaD";
    caixaAcoes.appendChild(imgbotD);
    
   
}
function salF(){ 
    listaAcoes.push("2");
    caixaAcoes = document.querySelector(".caixaacoes");
    imgbotF = document.createElement("span");
    imgbotF.id = "frente";
    caixaAcoes.appendChild(imgbotF);
}

function atualizarPos(){
    Mapa.desenharMapa();
    Mapa.desenharJogador(Jogador.x, Jogador.y,Jogador.anguloAtual);
}

function fazerAcoes(){
    
    caixaAcoes = document.querySelector(".caixaacoes");
    
    for (let i=0; i < listaAcoes.length; i++){
        console.log(i);
        
        setTimeout(() => {
            if (i>=1){
                spanAnt.style.border = ("0px solid transparent");
            }
            switch (listaAcoes[i]) {
            case "0":
                Jogador.rotacionarE();
                break
            case "1":
                Jogador.rotacionarD();
                break
            case "2":
                Jogador.andar();
                break
        }
        spanAtual = caixaAcoes.children[i];
        spanAtual.style.border = ("solid 2px white");
        spanAnt = spanAtual;
        }, i*1000);
        
        

        
    }
    
}
function acender(){
    
}
function deletar(){
    if (listaAcoes.length === 0) {
        return;
    }
    caixaAcoes = document.querySelector(".caixaacoes");
    ultimoSpan = caixaAcoes.lastElementChild;
    listaAcoes.pop();
    caixaAcoes.removeChild(ultimoSpan);
    
}



const botrotE = document.getElementById("rotaE");
botrotE.addEventListener('click', salE);
const botrotD = document.getElementById("rotaD");
botrotD.addEventListener('click', salD);
const botAnda = document.getElementById("frente");
botAnda.addEventListener('click', salF);
const botAcende = document.getElementById("acende");
botAcende.addEventListener('click', acender);
const botIniciar = document.getElementById("iniciar");
botIniciar.addEventListener('click', fazerAcoes);
const botDeletar = document.getElementById("delete");
botDeletar.addEventListener('click', deletar);

// "FUNCAO" principal do codigo
atualizarPos();
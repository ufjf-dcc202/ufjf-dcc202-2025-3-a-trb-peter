
const areaMapa = document.querySelector('#area');

const listaAcoes = [];

const Jogador = {
    y: 0,
    x: 0,
    anguloAtual: 0,
   
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
        celulaJogador.style.backgroundImage = "url(https://img.freepik.com/fotos-premium/uma-abelha-de-close-up-isolada-em-uma-abelha-de-fundo-branco_1000714-22.jpg)";
        celulaJogador.style.transform = `rotate(${anguloAtual}deg)`;
        celulaJogador.classList= "jogador";
        if (Jpos == Mapa.checkpoint){
            alert("Voce ganhou!");
        }
    }
    
}

function salE (){ 
    listaAcoes.push("0")
    caixaAcoes = document.querySelector(".caixaacoes");
    imgbotE = document.createElement("img");
    imgbotE.id = "rotaE"
    caixaAcoes.appendChild(imgbotE);
}
function salD(){ listaAcoes.push("1")}
function salA(){ listaAcoes.push("2")}

function atualizarPos(){
    Mapa.desenharMapa();
    Mapa.desenharJogador(Jogador.x, Jogador.y,Jogador.anguloAtual);
}

function fazerAcoes(){
    for (let i=0; i < listaAcoes.length; i++){
        console.log(i);
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

        
    }
}



const botrotE = document.getElementById("rotaE");
botrotE.addEventListener('click', salE);
const botrotD = document.getElementById("rotaD");
botrotD.addEventListener('click', salD);

const botAnda = document.getElementById("frente");
botAnda.addEventListener('click', salA);

// "FUNCAO" principal do codigo
atualizarPos();
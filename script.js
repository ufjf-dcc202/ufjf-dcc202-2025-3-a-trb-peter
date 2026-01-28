
const areaMapa = document.querySelector('#area');
let ligado = false;
const listaAcoes = [];
const posicoesAcesa = [];
const obstaculos= ["celula-17"];
const listaf1 = [];
const switchf1 = false;
const switchf2 = false;

const Jogador = {
    y: 0,
    x: 0,
    z:0,
    anguloAtual: 90,
   
   
    arrumaAngulo: function(){
        if (Jogador.anguloAtual < 0){
            Jogador.anguloAtual +=360;
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
            case 180:
                if (Jogador.x+1<= 49 || Jogador.x+1) {Jogador.x++};
                break
            case 90:
                if (Jogador.y-5>= 0) {Jogador.y-=5};
                break
            case 0:
                if (Jogador.x-1>=0) {Jogador.x--};
                break
            case 270:
                if (Jogador.y+5<=49) {Jogador.y+=5};
                break
            
        }
        if (ligado) { posicoesAcesa.push(Jogador.x + Jogador. y); }
        atualizarPos();
    }

}
const Mapa = {
    tam: 50,
    checkpoint:47,
    area: areaMapa,
    desenharMapa: function () {
        areaMapa.innerHTML = "";
        for (let i = 0; i < Mapa.tam; i++) {
                const celula = document.createElement("span");
                celula.classList.add("celula");
                for (let j=0; j < posicoesAcesa.length; j++){
                    if (i === posicoesAcesa[j]){
                        celula.classList.add("acesa");
                    }
                    
                }
                
                celula.id = `celula-${i}`;
                for (let k=0; k< obstaculos.length; k++){
                    if (celula.id === obstaculos[k]) {
                        celula.classList.add("obstaculo");
                    }
                }
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
    if (switchf1) {
        listaf1.push("0");
        caixaAcoes = document.querySelector(".caixaacoesf1");
        imgbotE = document.createElement("span");
        imgbotE.id = "rotaE";
        caixaAcoes.appendChild(imgbotE);
    }else if (switchf2){
        listaf1.push("0");
        caixaAcoes = document.querySelector(".caixaacoesf1");
        imgbotE = document.createElement("span");
        imgbotE.id = "rotaE";
        caixaAcoes.appendChild(imgbotE);
    }else {
        listaAcoes.push("0");
        caixaAcoes = document.querySelector(".caixaacoes");
        imgbotE = document.createElement("span");
        imgbotE.id = "rotaE";
        caixaAcoes.appendChild(imgbotE);
    }
    
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
function salP(){
    listaAcoes.push("3");
    caixaAcoes = document.querySelector(".caixaacoes");
    imgbotP = document.createElement("span");
    imgbotP.id = "pular";
    caixaAcoes.appendChild(imgbotP);
}

function atualizarPos(){
    Mapa.desenharMapa();
    Mapa.desenharJogador(Jogador.x, Jogador.y,Jogador.anguloAtual);
}

function fazerAcoes(variaveisAtuais){
    switch (variaveisAtuais){
        case "1":
            divacoes = document.querySelector(".caixaacoesf1");
            arrayacoes = listaf1;
        default:
            divacoes = document.querySelector(".caixaacoes");
            arrayacoes = listaAcoes;
    }
    
    for (let i=0; i < arrayacoes.length; i++){
        console.log(i);
        

        setTimeout(() => {

            botIniciar.disabled = true;
            botAnda.disabled = true;
            botrotD.disabled = true;
            botrotE.disabled = true;

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
            case "3":
                Jogador.pular();
            // case "4":
            //     fazerAcoes(document.querySelector("f1", listaf1);
        }
        spanAtual = divacoes.children[i];
        spanAtual.style.border = ("solid 2px white");
        spanAnt = spanAtual;
        }, i*1000);
        
        

        
    }
    setTimeout(() => {
        botIniciar.disabled = false;
        botAnda.disabled = false;
        botrotD.disabled = false;
        botrotE.disabled = false;


        for(let i=0; i<arrayacoes.length; i++){
            spanAtual = divacoes.children[i];
            spanAtual.style.border = ("0px solid transparent");
        }
    }, listaAcoes.length * 1000);
    
}
function acender(){
    if (ligado) {
      ligado = false;
      botAcende.style.backgroundImage= "url(img/botaoacoff.png)";
    } else {
      ligado = true;
      botAcende.style.backgroundImage= "url(img/botaoacon.png)";
      posicoesAcesa.push(Jogador.x + Jogador. y);
    }
}
function deletar(){
    if (listaAcoes.length === 0) {
        return;
    }
    caixaAcoes = document.querySelector(".caixaacoes");
    listaAcoes.pop();
    caixaAcoes.innerHTML = "";
}
function pular() {
    Jogador.z++
}
function func1 (){
    listaAcoes.push("4");
    caixaAcoes = document.querySelector(".caixaacoes");
    imgbotf1 = document.createElement("span");
    imgbotf1.id = "f1";
    caixaAcoes.appendChild(imgbotf1);

}




const botrotE = document.getElementById("rotaE");
botrotE.addEventListener('click', salE);
const botrotD = document.getElementById("rotaD");
botrotD.addEventListener('click', salD);
const botAnda = document.getElementById("frente");
botAnda.addEventListener('click', salF);
const botPular = document.getElementById("pular");
botPular.addEventListener('click', salP);
const botAcende = document.getElementById("acende");
botAcende.addEventListener('click', acender);
const botIniciar = document.getElementById("iniciar");
botIniciar.addEventListener('click', fazerAcoes);
const botDeletar = document.getElementById("delete");
botDeletar.addEventListener('click', deletar);
const botF1 = document.getElementById("f1");
botF1.addEventListener('click', func1);


// "FUNCAO" principal do codigo
atualizarPos();
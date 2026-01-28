
const areaMapa = document.querySelector('#area');
let ligado = false;
let switchf1 = false;
let switchf2 = false;

const listaAcoes = [];
const posicoesAcesa = [];
const obstaculos= [17,18,16,19];
const listaf1 = [];
const listaf2 = [];

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
    pular: function(){
        Jogador.z +=1;
        Jogador.andar();
        Jogador.z -=1; 

    },
    andar: function(){
        colisao = false;
        angl = Math.abs(Jogador.anguloAtual);
        posInicial = [Jogador.x,Jogador.y];
        
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
        for (let i=0; i<obstaculos.length; i++){
            if (Jogador.x + Jogador.y === obstaculos[i] && Jogador.z===0){
                colisao = true;
            }
        }
        if (colisao) {
            Jogador.x = posInicial[0];
            Jogador.y = posInicial[1];
        }
        if (!colisao) {
            if (ligado) { posicoesAcesa.push(Jogador.x + Jogador.y); }
            atualizarPos();
        }
        
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
                    if (i === obstaculos[k]) {
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
        listaf2.push("0");
        caixaAcoes = document.querySelector(".caixaacoesf2");
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
function salD (){ 
    if (switchf1) {
        listaf1.push("1");
        caixaAcoes = document.querySelector(".caixaacoesf1");
        imgbotD = document.createElement("span");
        imgbotD.id = "rotaD";
        caixaAcoes.appendChild(imgbotD);

    } else if (switchf2){
        listaf2.push("1");
        caixaAcoes = document.querySelector(".caixaacoesf2");
        imgbotD = document.createElement("span");
        imgbotD.id = "rotaD";
        caixaAcoes.appendChild(imgbotD);

    } else {
        listaAcoes.push("1");
        caixaAcoes = document.querySelector(".caixaacoes");
        imgbotD = document.createElement("span");
        imgbotD.id = "rotaD";
        caixaAcoes.appendChild(imgbotD);
    }
}

function salF (){ 
    if (switchf1) {
        listaf1.push("2");
        caixaAcoes = document.querySelector(".caixaacoesf1");
        imgbotF = document.createElement("span");
        imgbotF.id = "frente";
        caixaAcoes.appendChild(imgbotF);

    } else if (switchf2){
        listaf2.push("2");
        caixaAcoes = document.querySelector(".caixaacoesf2");
        imgbotF = document.createElement("span");
        imgbotF.id = "frente";
        caixaAcoes.appendChild(imgbotF);

    } else {
        listaAcoes.push("2");
        caixaAcoes = document.querySelector(".caixaacoes");
        imgbotF = document.createElement("span");
        imgbotF.id = "frente";
        caixaAcoes.appendChild(imgbotF);
    }
}

function salP (){ 
    if (switchf1) {
        listaf1.push("3");
        caixaAcoes = document.querySelector(".caixaacoesf1");
        imgbotP = document.createElement("span");
        imgbotP.id = "pular";
        caixaAcoes.appendChild(imgbotP);

    } else if (switchf2){
        listaf2.push("3");
        caixaAcoes = document.querySelector(".caixaacoesf2");
        imgbotP = document.createElement("span");
        imgbotP.id = "pular";
        caixaAcoes.appendChild(imgbotP);

    } else {
        listaAcoes.push("3");
        caixaAcoes = document.querySelector(".caixaacoes");
        imgbotP = document.createElement("span");
        imgbotP.id = "pular";
        caixaAcoes.appendChild(imgbotP);
    }
}


function atualizarPos(){
    Mapa.desenharMapa();
    Mapa.desenharJogador(Jogador.x, Jogador.y,Jogador.anguloAtual);
}

function fazerAcoes(caixaatual){
    switch (caixaatual){
        case "1":
            divacoes = document.querySelector(".caixaacoesf1");
            arrayacoes = listaf1;
            break;
        default:
            divacoes = document.querySelector(".caixaacoes");
            arrayacoes = listaAcoes;
            break;
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
            switch (arrayacoes[i]) {
            case "0":
                Jogador.rotacionarE();
                break;
            case "1":
                Jogador.rotacionarD();
                break;
            case "2":
                Jogador.andar();
                break;
            case "3":
                Jogador.pular();
                break;
            case "4":
                fazerAcoes("1");
                break;
        }
        if (divacoes.children[i] != null) {
            spanAtual = divacoes.children[i];
            spanAtual.style.border = ("solid 2px red");
            spanAnt = spanAtual;
        }
        
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

    listaAcoes.splice(0, listaAcoes.length);
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
function editaf1(){
    fundof1 = document.querySelector(".caixaacoesf1");
    if (switchf1){
        switchf1=false;
        botEditaf1.style.backgroundImage = "url(img/editar.png)"
        fundof1.style.backgroundColor = "rgb(61, 129, 188)";
    }else {
        switchf1 = true;
        botEditaf1.style.backgroundImage = "url(img/editaron.png)"
       
        fundof1.style.backgroundColor ="lightblue";
    }

}
function editaf2(){
    fundof2 = document.querySelector(".caixaacoesf2");
    if (switchf2){
        switchf2=false;
        botEditaf2.style.backgroundImage = "url(img/editar.png)"
        fundof2.style.backgroundColor = "rgb(61, 129, 188)";
    }else {
        switchf2 = true;
        botEditaf2.style.backgroundImage = "url(img/editaron.png)"
        fundof2.style.backgroundColor ="lightblue";
    }

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
const botEditaf1 = document.getElementById("editarf1");
botEditaf1.addEventListener('click', editaf1);
const botEditaf2 = document.getElementById("editarf2");
botEditaf2.addEventListener('click', editaf2);


// "FUNCAO" principal do codigo
atualizarPos();
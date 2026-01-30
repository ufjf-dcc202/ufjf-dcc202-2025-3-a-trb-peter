

const areaMapa = document.querySelector('#area');
const params = new URLSearchParams(window.location.search);

let ligado = false;
let switchf1 = false;
let switchf2 = false;

const listaAcoes = [[],[]];
const posicoesAcesa = [];

let obst1= [];
let obst2= [];
let obst3 = [];
let posCheckpoint = 0;

const listaf1 = [[],[]];
const listaf2 = [[],[]];

const MapaAtual = params.get("mapa");

switch (MapaAtual){
    case '2':
        obst1= [10,11,12];
        obst2=[18,4,3,30,31,43];
        obst3= [15,16,17,39];
        posCheckpoint = 47;
        break;
    case '3':
        obst1= [3,4,27,26,28];
        obst2= [5,6,10,11,29,49,45];
        obst3 = [42,13,34];
        posCheckpoint = 47;
        break;
    default:
        obst1= [18,19,23,24,30,25,48,46,42,41,43];
        obst2=[7,13];
        obst3 = [14,26,38];
        posCheckpoint = 47;
        break;
}

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
        

    },
    rotacionarD: function () {
        
        celulaJogador= document.querySelector(".jogador");
        Jogador.anguloAtual+=90;
        Jogador.arrumaAngulo();
        celulaJogador.style.transform = `rotate(${Jogador.anguloAtual}deg)`;
        
    },
    pular: function(){
        Jogador.z +=1;
        Jogador.andar();
        Jogador.z -=1; 

    },
    andar: function(){
        colisaoObst1 = false;
        colisaoObst2= false;
        colisaoObst3= false;
        angl = Math.abs(Jogador.anguloAtual);
        posInicial = [Jogador.x,Jogador.y];
        velHor = 5;
        velVer = 1;
        limiteVer = Mapa.tam -1;
        switch (angl){
            case 180:
                if (Jogador.x+1<= limiteVer) {Jogador.x+= velVer};
                break
            case 90:
                if (Jogador.y-5>= 0) {Jogador.y-=velHor};
                break
            case 0:
                if (Jogador.x-1>=0) {Jogador.x-= velVer};
                break
            case 270:
                if (Jogador.y+5<=limiteVer) {Jogador.y+=velHor};
                break
            
            
        }
        for (let i=0; i<obst1.length; i++){
            if (Jogador.x + Jogador.y === obst1[i] && Jogador.z===0){
                colisaoObst1 = true;
            }
        }
        for (let j=0; j<obst2.length; j++){
            if (Jogador.x + Jogador.y === obst2[j]){
                colisaoObst2 = true;
            }
        }
        for (let k=0; k<obst3.length; k++){
            if (Jogador.x + Jogador.y === obst3[k]){
                colisaoObst3 = true;
            }
        }
        
        if (colisaoObst3){
            alert("Voce perdeu! ;(");
            location.reload()
        }
        else if (!colisaoObst1 && !colisaoObst2) {
            if (ligado) { posicoesAcesa.push(Jogador.x + Jogador.y); }
            atualizarPos();
        }else{
            Jogador.x = posInicial[0];
            Jogador.y = posInicial[1];
        }
        
    }

}
const Mapa = {
    h: 10,
    l: 5,
    tam: 50,
    checkpoint:posCheckpoint,
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
                for (let k=0; k< obst1.length; k++){
                    if (i === obst1[k]) {
                        celula.classList.add("obstaculo");
                    }
                }

                for (let l=0; l< obst2.length; l++){
                    if (i === obst2[l]) {
                        celula.classList.add("obstaculo2");
                    }
                }
                for (let m=0; m< obst3.length; m++){
                    if (i === obst3[m]) {
                        celula.classList.add("obstaculo3");
                    }
                }

                areaMapa.appendChild(celula);
                
        }
        
        document.getElementById(`celula-${Mapa.checkpoint}`).classList.add("chegada");
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
function AdicionarAcao(nAcao, idAcao){
    
    if (switchf1){
        listaf1[0].push(nAcao);
        caixaAcoes = document.querySelector(".caixaacoesf1");
        span = document.createElement("span");
        span.id = idAcao;
        listaf1[1].push(span);
        caixaAcoes.appendChild(span);
        
    }
    else if (switchf2){
        listaf2[0].push(nAcao);
        caixaAcoes = document.querySelector(".caixaacoesf2");
        span = document.createElement("span");
        span.id = idAcao;
        listaf2[1].push(span);
        caixaAcoes.appendChild(span);
        
    }else{
        listaAcoes[0].push(nAcao);
        caixaAcoes = document.querySelector(".caixaacoes");
        span = document.createElement("span");
        span.id = idAcao;
        listaAcoes[1].push(span);
        caixaAcoes.appendChild(span);
    }

}

function atualizarPos(){
    Mapa.desenharMapa();
    Mapa.desenharJogador(Jogador.x, Jogador.y,Jogador.anguloAtual);
}
function fazAcao(arrayacao, indice){
    indiceSpan= indice;
    setTimeout(() => {
         if (indice>0 && typeof spanSel !== "undefined" ){
            spanAnt = spanSel
            spanAnt.style.border = "none";
        } 
        if (indice>= arrayacao[0].length){
            spanAnt.style.border = "none";
            botIniciar.disabled = false;
            botAnda.disabled = false;
            botrotD.disabled = false;
            botrotE.disabled = false;
            botDeletar.disabled = false;
            return;
        }
       
        botIniciar.disabled = true;
        botAnda.disabled = true;
        botrotD.disabled = true;
        botrotE.disabled = true;
        botDeletar.disabled = true;
        acao = arrayacao[0][indice];
        switch (acao) {
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
                    arrayacao[0].splice(indice + 1, 0,...listaf1[0]);
                    arrayacao[1].splice(indice + 1, 0,...listaf1[1]);
                    break;
                case "5":
                    arrayacao[0].splice(indice + 1, 0,...listaf2[0]);
                    arrayacao[1].splice(indice + 1, 0,...listaf2[1]);
                    break;
            
            }
            indice++;

            spanSel= arrayacao[1][indiceSpan];
            spanSel.style.border = "2px red solid ";
        
            fazAcao(arrayacao, indice);
    }, 1000);
    
       
}

function fazerAcoes(){
      
    divacoes = document.querySelector(".caixaacoes");
    arrayacoes = listaAcoes;
    indiceA = 0;

    fazAcao(listaAcoes,indiceA);
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
function deletar(divAcoes){
    switch (divAcoes){
        default :
            arrayacoes = listaAcoes;
            caixaAcoes = document.querySelector(".caixaacoes");
            break;
        case 1:
            arrayacoes = listaf1;
            caixaAcoes = document.querySelector(".caixaacoesf1");
            break;
        case 2:
            arrayacoes = listaf2;
            caixaAcoes = document.querySelector(".caixaacoesf2");
            break;
    }
    if (arrayacoes[0].length === 0) {
        return;
    }
    arrayacoes[0].splice(0, arrayacoes[0].length);
    arrayacoes[1].splice(0, arrayacoes[1].length);
    caixaAcoes.innerHTML = "";
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
botrotE.addEventListener('click', () => AdicionarAcao("0", botrotE.id));

const botrotD = document.getElementById("rotaD");
botrotD.addEventListener('click', () => AdicionarAcao("1", botrotD.id));

const botAnda = document.getElementById("frente");
botAnda.addEventListener('click', () => AdicionarAcao("2", botAnda.id));

const botPular = document.getElementById("pular");
botPular.addEventListener('click', () => AdicionarAcao("3", botPular.id));

const botF1 = document.getElementById("f1");
botF1.addEventListener('click', () => AdicionarAcao("4", botF1.id));

const botF2 = document.getElementById("f2");
botF2.addEventListener('click', () => AdicionarAcao("5", botF2.id));

const botAcende = document.getElementById("acende");
botAcende.addEventListener('click', () => acender());

const botIniciar = document.getElementById("iniciar");
botIniciar.addEventListener('click', () => fazerAcoes());

const botDeletar = document.getElementById("delete");
botDeletar.addEventListener('click', () => deletar());

const botDeletarf1 = document.getElementById("deletef1");
botDeletarf1.addEventListener('click', () => deletar(1));

const botDeletarf2 = document.getElementById("deletef2");
botDeletarf2.addEventListener('click', () => deletar(2));

const botEditaf1 = document.getElementById("editarf1");
botEditaf1.addEventListener('click', () => editaf1());

const botEditaf2 = document.getElementById("editarf2");
botEditaf2.addEventListener('click', () => editaf2());



// "FUNCAO" principal do codigo
atualizarPos();
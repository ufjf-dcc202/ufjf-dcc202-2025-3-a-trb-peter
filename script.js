
const areaMapa = document.querySelector('#area');
let ligado = false;
let switchf1 = false;
let switchf2 = false;

const listaAcoes = [[],[]];
const posicoesAcesa = [];
const obstM1= [18,19,23,24,30,25,48,46,42,41,43];
const listaf1 = [[],[]];
const listaf2 = [[],[]];

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
        for (let i=0; i<obstM1.length; i++){
            if (Jogador.x + Jogador.y === obstM1[i] && Jogador.z===0){
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
                for (let k=0; k< obstM1.length; k++){
                    if (i === obstM1[k]) {
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
function AdicionarAcao(nAcao, idAcao,funcao){
    
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
function func1 (){
    listaAcoes[0].push("4");
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
botrotE.addEventListener('click', () => AdicionarAcao("0", botrotE.id));

const botrotD = document.getElementById("rotaD");
botrotD.addEventListener('click', () => AdicionarAcao("1", botrotD.id));

const botAnda = document.getElementById("frente");
botAnda.addEventListener('click', () => AdicionarAcao("2", botAnda.id));

const botPular = document.getElementById("pular");
botPular.addEventListener('click', () => AdicionarAcao("3", botPular.id));

const botAcende = document.getElementById("acende");
botAcende.addEventListener('click', () => acender());

const botIniciar = document.getElementById("iniciar");
botIniciar.addEventListener('click', () => fazerAcoes());

const botDeletar = document.getElementById("delete");
botDeletar.addEventListener('click', () => deletar());

const botF1 = document.getElementById("f1");
botF1.addEventListener('click', () => AdicionarAcao("4", f1.id));

const botF2 = document.getElementById("f2");
botF2.addEventListener('click', () => AdicionarAcao("5", f2.id));

const botEditaf1 = document.getElementById("editarf1");
botEditaf1.addEventListener('click', () => editaf1());

const botEditaf2 = document.getElementById("editarf2");
botEditaf2.addEventListener('click', () => editaf2());



// "FUNCAO" principal do codigo
atualizarPos();
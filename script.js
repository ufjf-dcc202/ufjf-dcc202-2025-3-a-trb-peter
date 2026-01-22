const areaMapa = document.querySelector('#area');

const Jogador = {
    y: 0,
    x: 0,
    andarDireita : function (){
        Jogador.x++;
    }

}
const Mapa = {
    tam: 50,
    checkpoit:47 ,
    area: areaMapa,
    desenharMapa: function () {
        areaMapa.innerHTML = "";
        for (let i = 0; i < Mapa.tam; i++) {
                const celula = document.createElement("span");
                celula.classList.add("celula");
                celula.id = String(i);
                areaMapa.appendChild(celula);
        }
        document.getElementById("47").style.backgroundImage ="url(https://i.pinimg.com/736x/7a/25/27/7a2527042f10403dbbe74146e93640b7.jpg)";
    }
    
}





// const botAndarD = document.getElementById("botD");
// botAndarD.addEventListener("click", Jogador.andarDireita() );



// "FUNCAO" principal do codigo
Mapa.desenharMapa();
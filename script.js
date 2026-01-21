let Jogador = {
    y: 0,
    x: 0,
    andarDireita : function (){
        Jogador.x++;
    }

}

const botAndarD = document.getElementById("botD");
botAndarD.addEventListener("click", Jogador.andarDireita() );
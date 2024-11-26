import songs from './dao.js';

let btnSongA = document.getElementById("btnSongA");
let btnSongB = document.getElementById("btnSongB");
let btnBoth = document.getElementById("btnBoth");
let btnNeither = document.getElementById("btnNeither");
let divButtons = document.getElementById("divButtons");
let btnPlay =  document.getElementById("btnPlay");
let olRanking = document.getElementById("olRanking");
let divRanking = document.getElementById("divRanking")

const points = []
// initialize the array with 0, in order to start counting points
function initializeArr(){
    for(let i = 0; i < songs.length; i++){
        points[i] = ({name: songs[i], points: 0});
    }
}


//estaría bueno tener un boton "play" que al apretarlo cambie el display y cargue toda esta información. y que esta función sea llamada en un onclick, no acá suelta. Mas adelante.
btnPlay.addEventListener('click', play);
async function play(){

    initializeArr(); 
    btnPlay.style.display = "none";
    divButtons.style.display = "flex";
    



    for (let i = 0; i < points.length; i++) {
        for(let j = i + 1; j<points.length; j++){
            loadNew(i,j);
            await waitChoice(i,j);

        }
       
    }

    rank()

}

function loadNew(i,j){
    btnSongA.innerText = songs[i];
    btnSongB.innerText = songs[j];
}

function addPoints(index1, optionalIndex = null){
    points[index1].points ++;

    if(optionalIndex != null){
        points[optionalIndex].points ++;
    }
    
}

function waitChoice(i,j){
    return new Promise((res) =>{
        btnSongA.addEventListener('click', ()=>{ addPoints(i); res();});
        btnSongB.addEventListener('click', () => { addPoints(j); res();});
        btnBoth.addEventListener('click', () => {addPoints(i, j); res();});
        btnNeither.addEventListener('click', () => {res();});
        
    })
}

function rank(){

    points.sort((a,b) => b.points - a.points)
    
    for(let i = 0; i  < points.length; i ++){
        olRanking.innerHTML += `<li style="margin:1em;"> ${points[i].name}</li>`
        //olRanking.innerHTML += `<li style="margin:1em;"> ${points[i].name} ${points[i].points}</li>`
    }

    divButtons.style.display = "none"
    divRanking.style.display = "flex";
}


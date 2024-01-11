/*
### Consegna
- Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
- Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
- In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
- La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
- Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

####  MILESTONE 1 ✔
- Prepariamo "qualcosa" per tenere il punteggio dell'utente.
- Quando l'utente clicca su una cella, incrementiamo il punteggio.
- Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
#### MILESTONE 2 ✔
- Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
- Generiamoli e stampiamo in console per essere certi che siano corretti
#### MILESTONE 3 ✔
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
#### MILESTONE 4 ✔
- Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. - - - Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)
#### MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

#### BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

#### SUPER BONUS
Quando l'utente clicca una bomba, scopriamo tutte le caselle del tabellone, colorando di rosso tutte le bombe
*/

// Recupero elementi
let grid = document.getElementById("grid");
const form = document.querySelector("form");
const button = document.getElementById("btn-play");
const levelSelect = document.getElementById("level");
let message = document.querySelector(".message")
//TODO: crea e recupera un elemento per segnare il punteggio in pagina


// Variabili celle, bombe, punti
const rows = 10; //da cambiare in seguito per la select
const cols = 10; //da cambiare in seguito per la select
const totalCells = rows * cols;
//TODO: switch case per i numeri di celle 
//TODO: settare il css per la gradezza celle
const totalBombs = 16; //da cambiare in seguito per la select
//TODO opzionale: cambiare numero delle bombe a seconda del livello
let score = 0;
const maxScore = totalCells - totalBombs;

//? FUNZIONI-----------------------------------------
// Funzione creazione celle
const createNewCell = (num) => {
    const newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.innerText = num;
    return newCell;
}

// Funzione creazione bombe
const createBombs = (bombNumber, maxBombs) => {
    const bombs = [];
    while(bombs.length < maxBombs) {
        //randomizzatore
        const randomNumber = Math.floor(Math.random() * bombNumber) +1;
        if (!bombs.includes(randomNumber)) {
            bombs.push(randomNumber);
        }
    }
    return bombs;
}

//? ----------------------------------------------------

//! Inizio della partita al click
form.addEventListener ("submit", function(event) {
    event.preventDefault();
    grid.innerHTML = "";
    //Spawn delle bombe
    const bombs = createBombs(totalCells, totalBombs);
    console.log(bombs);
    
    for(let i = 1; i <= totalCells; i++ ) {
        const cell = createNewCell(i);
        
        cell.addEventListener ("click", () => {
            if (cell.classList.contains("bg-cell")) return;
            cell.classList.add("bg-cell");
            console.log("Cella cliccata: ", i);

            //Controllo bomba
            const hasHit = bombs.includes(i);
            console.log(hasHit);

            if (hasHit) {
                //game over
                message.innerHTML = `Hai perso! Il tuo punteggio è ${score}`;
                cell.classList.add("bombs");
            } else {
                // Incremento punteggio
                console.log("Punteggio: ", ++score);

                //win
                if (score === maxScore) {
                    message.innerText = "Hai vinto!";
                }
            }

        })
        
        
        grid.appendChild(cell);
    }
})


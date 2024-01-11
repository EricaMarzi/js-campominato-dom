
/*
#### BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

// Recupero elementi
const grid = document.getElementById("grid");
const form = document.querySelector("form");
const button = document.getElementById("btn-play");
const levelSelect = document.getElementById("level");
const message = document.querySelector(".message")
const displayScore = document.getElementById("score")


// Variabili celle, bombe, punti
let rows = 10; 
let cols = 10; 

//! 
const level = levelSelect.value;
switch (level) {
    case "normal":
        rows = 9;
        cols = 9;
        break
    case "hard":
        rows = 7;
        cols = 7;
        break
}       
const totalCells = rows * cols;
//TODO: settare il css per la gradezza celle
const totalBombs = 16; 
let score = 0;
const maxScore = totalCells - totalBombs;

//! FUNZIONI-----------------------------------------
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

// Funzione reset
const reset = () => {
    grid.innerHTML = "";
    score = 0;
    message.innerText = "";
    displayScore.innerText = 0; 

}

// Funzione rivela bombe 
const revealBomb = (bombs) => {
    const cells = document.querySelectorAll(".cell");
    
    for (let cell of cells) {
        cell.classList.add("bg-cell");
        if(bombs.includes(parseInt(cell.innerText))) {
            cell.classList.add("bombs");
        }
    }
} 

//! ----------------------------------------------------

//! Inizio della partita al click
form.addEventListener ("submit", function(event) {
    event.preventDefault();
    reset()

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

                //TODO: funzione per rivelare bombe
                revealBomb(bombs);
            } else {
                // Incremento punteggio
                displayScore.innerText = ++score; 

                //win
                if (score === maxScore) {
                    message.innerText = "Hai vinto!";
                }
            }

        })
        
        
        grid.appendChild(cell);
    }
})


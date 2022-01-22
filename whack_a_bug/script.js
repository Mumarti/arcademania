//inseriamo il punteggio iniziale
const scoreDisplay = document.querySelector("#score-display");
let score = 0;
scoreDisplay.innerText = score;

//inseriamo il timer inziale
const timerDisplay = document.querySelector("#timer-display");
let timerLeft = 30;
timerDisplay.innerText = timerLeft;

//inseriamo il bug in una cella via JS
const cells = document.querySelectorAll(".cell");

//diamo un valore di velocità iniziale
let bugSpeed = 800;

//logica per randomizzare il bug in una cella
function randomBug() {
  /*da fare: pulire tutte le celle prima di randomizzarne un'altra*/
  removeBug();

  if (score === 10) {
    bugSpeed = bugSpeed - 400;
  }

  /*randomizzo una cella a caso */
  const randomNumber = Math.floor(Math.random() * cells.length);
  const cell = cells[randomNumber];
  cell.classList.add("bug");
}

const bugMovement = setInterval(randomBug, bugSpeed);

function removeBug() {
  for (let i = 0; i < cells.length; i++) {
    const cellToClean = cells[i];

    cellToClean.classList.remove("bug");
  }
}

//diamo modo all'utente di colpire il bug
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener("click", function () {
    //devo verificare se la cella ha un bug
    if (cell.classList.contains("bug")) {
      score++;
      scoreDisplay.innerText = score;
      cell.classList.remove("bug");
      cell.classList.add("splat");

      //puliamo la cella dallo splat
      setTimeout(function () {
        cell.classList.remove("splat");
      }, 300);
    }
  });
}

//impostiamo un conto alla rovescia
const timer = setInterval(countDown, 1000);
function countDown() {
  timerLeft--;
  timerDisplay.innerText = timerLeft;

  if (timerLeft === 0) {
    clearInterval(timer);
    clearInterval(bugMovement);
    removeBug();

    showAlert(`GAME OVER! Punti: ${score}`);
  }
}

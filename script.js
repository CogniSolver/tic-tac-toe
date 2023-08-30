const cells = document.querySelectorAll("[data-cell]");
const gameStatus = document.getElementById("status");
const restartButton = document.getElementById("restart");
const computerCheckBox = document.getElementById("computer");

let computerPlaying = false;
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameWon = false;
let gameTie = false;
let movesCount = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

computerCheckBox.addEventListener("change", () => {
  computerPlaying = computerCheckBox.checked;
  if (computerPlaying) {
    currentPlayer = "X";
    gameStatus.textContent = `Current Player: ${currentPlayer}`;
  }
});

function handleClicks(event) {
  movesCount++;
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);
  if (gameBoard[index] === "" && !gameWon) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (computerPlaying && movesCount < 8) {
      movesCount++;
      let computerIndex;
      do {
        computerIndex = Math.floor(Math.random() * 9);
      } while (gameBoard[computerIndex] !== "");

      gameBoard[computerIndex] = currentPlayer === "X" ? "O" : "X";
      cells[computerIndex].textContent = currentPlayer === "X" ? "O" : "X";
      checkWin();
    } else {
      checkWin();
      if (!gameTie && !gameWon) {
        switchPlayer();
      }
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.textContent = `Current Player: ${currentPlayer}`;
}

function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameWon = true;
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      gameStatus.textContent = `${gameBoard[a]} has won!`;
      break;
    }
  }

  if (!gameBoard.includes("") && !gameWon) {
    gameTie = true;
    gameStatus.textContent = `Game ended in a tie`;
    return;
  }
}

function restartGame() {
  movesCount = 0;
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameWon = false;
  gameTie = false;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });

  gameStatus.textContent = `Current Player: ${currentPlayer}`;
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleClicks);
});

restartButton.addEventListener("click", restartGame);

gameStatus.textContent = `Current Player: ${currentPlayer}`;

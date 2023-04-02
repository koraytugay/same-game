import newSameGame from "./sameGame.js";
import gameService from "./gameService.js";
import {ROW_COUNT, COL_COUNT} from "./constants.js";

let game = newSameGame();

const divGameBoardContainer = document.querySelector("#game-board-container");
const selectionPoints = document.querySelector("#selection-points");
const totalPoints = document.querySelector("#total-points");
const newGameLink = document.querySelector("#new-game-link");
const scoreCard = document.querySelector("#score-card");
const totalScoreDiv = document.querySelector("#total-score");

newGameLink.addEventListener("click", () => {
  game = newSameGame();
  drawBoard();
});

function drawBoard() {
  selectionPoints.textContent = game.selectionPoints;
  totalPoints.textContent = game.totalPoints;

  if (game.finished) {
    scoreCard.style.display = "block";
    totalScoreDiv.textContent = `Total Points: ${game.totalPoints}`;
  } else {
    scoreCard.style.display = "none";
  }

  divGameBoardContainer.innerHTML = "";
  for (let row = 0; row < ROW_COUNT; row++) {
    const divGameBoardRow = document.createElement("div");
    for (let col = 0; col < COL_COUNT; col++) {
      const buttonGameTile = document.createElement("button");
      buttonGameTile.classList.add("gameTile");

      if (game.board[row][col] !== null) {
        buttonGameTile.classList.add(`gameTile-${game.board[row][col].color}`);
        if (game.board[row][col].isClicked) {
          buttonGameTile.classList.add("marked");
        }
        buttonGameTile.addEventListener("click", () => {
          gameService.clickTile(game, row, col);
          drawBoard();
        });
      } else {
        buttonGameTile.classList.add("gameTileDisabled");
      }
      divGameBoardRow.appendChild(buttonGameTile);
    }
    divGameBoardContainer.appendChild(divGameBoardRow);
  }
}

drawBoard();

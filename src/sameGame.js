import {ROW_COUNT, COL_COUNT} from "./constants.js";
import {randomColor} from "./utils.js";

function newSameGame(game) {

  const board = game == null ? [] : game.board;

  for (let i = 0; i < ROW_COUNT; i++) {
    let row = board[i] == null ? new Array(COL_COUNT).fill(null) : board[i];
    for (let j = 0; j < COL_COUNT; j++) {
      if (row[j] == null) {
        row[j] = {
          isClicked: false,
          color: randomColor(),
        };
      }
    }
    board[i] = row;
  }

  return {
    board: [...board],
    finished: false,
    selectionPoints: 0,
    totalPoints: 0
  }
}

export default newSameGame;

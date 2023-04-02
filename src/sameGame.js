import {ROW_COUNT, COL_COUNT} from "./constants.js";
import {randomColor} from "./utils.js";

function newSameGame() {
  const board = [];

  for (let i = 0; i < ROW_COUNT; i++) {
    let row = [];
    for (let j = 0; j < COL_COUNT; j++) {
      row.push({
        isClicked: false,
        color: randomColor(),
      });
    }
    board.push(row);
  }

  return {
    board: [...board],
    finished: false,
    selectionPoints: 0,
    totalPoints: 0
  }
}

export default newSameGame;

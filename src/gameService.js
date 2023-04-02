import {ROW_COUNT, COL_COUNT} from "./constants.js";

function clickTile(game, row, column) {
  const alreadyClicked = game.board[row][column].isClicked;

  if (alreadyClicked) {
    game.totalPoints = game.totalPoints + game.selectionPoints;
  }

  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (game.board[row][col] !== null) {
        game.board[row][col].isClicked = false;
      }
    }
  }

  const visited = [];
  for (let i = 0; i < ROW_COUNT; i++) {
    visited.push(new Array(COL_COUNT).fill(false));
  }

  const color = game.board[row][column].color;
  spread(game, row, column, color, visited, alreadyClicked);

  let clickedCount = 0;
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (game.board[row][col] && game.board[row][col].isClicked) {
        clickedCount++;
      }
    }
  }

  if (clickedCount === 1) {
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COL_COUNT; col++) {
        if (game.board[row][col] !== null) {
          game.board[row][col].isClicked = false;
        }
      }
    }
  }

  if (clickedCount !== 0) {
    game.selectionPoints = (clickedCount - 1) * (clickedCount - 1);
  } else {
    game.selectionPoints = 0;
  }

  traverseRows(game);
  traverseColumns(game);
  isGameFinished(game);
}

function spread(game, row, column, color, visited, isRemove) {
  if (visited[row][column]) {
    return;
  }

  visited[row][column] = true;

  if (game.board[row][column].color !== color) {
    return;
  }

  if (isRemove) {
    game.board[row][column] = null;
  } else {
    game.board[row][column].isClicked = true;
  }

  if (row !== 0 && game.board[row - 1][column] !== null) {
    spread(game, row - 1, column, color, visited, isRemove);
  }

  if (row !== ROW_COUNT - 1 && game.board[row + 1][column] !== null) {
    spread(game, row + 1, column, color, visited, isRemove);
  }

  if (column !== 0 && game.board[row][column - 1] !== null) {
    spread(game, row, column - 1, color, visited, isRemove);
  }

  if (column !== COL_COUNT - 1 && game.board[row][column + 1] !== null) {
    spread(game, row, column + 1, color, visited, isRemove);
  }
}

function traverseRows(game) {
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (game.board[row][col] == null) {
        shiftDown(game, row, col);
      }
    }
  }
}

function traverseColumns(game) {
  for (let col = COL_COUNT; col >= 0; col--) {
    if (game.board[ROW_COUNT - 1][col] === null) {
      for (let row = 0; row < ROW_COUNT; row++) {
        game.board[row] = [...game.board[row].slice(0, col),
          ...game.board[row].slice(col + 1, COL_COUNT)];
        game.board[row][COL_COUNT - 1] = null;
      }
    }
  }
}

function shiftDown(game, row, col) {
  for (let i = row; i > 0; i--) {
    if (game.board[i - 1][col] !== null) {
      game.board[i][col] = game.board[i - 1][col];
      game.board[i - 1][col] = null;
    } else {
      break;
    }
  }
}

function isGameFinished(game) {
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let col = 0; col < COL_COUNT; col++) {
      if (game.board[row][col] !== null) {
        if (col !== COL_COUNT - 1 && game.board[row][col + 1] !== null) {
          if (game.board[row][col].color === game.board[row][col + 1].color) {
            return false;
          }
        }
        if (row !== ROW_COUNT - 1 && game.board[row + 1][col] !== null) {
          if (game.board[row][col].color === game.board[row + 1][col].color) {
            return false;
          }
        }
      }
    }
  }

  game.finished = true;
}

export default {
  clickTile
}

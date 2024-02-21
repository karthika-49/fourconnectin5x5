function minimax(board, depth, alpha, beta, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    if (result === ai) {
      return 10 - depth; // Higher score for quicker wins
    } else if (result === human) {
      return depth - 10; // Lower score for quicker losses
    } else {
      return 0; // Tie
    }
  }

  if (depth >= 4) {
    return evaluate(board); // Use heuristic evaluation if depth is greater than a threshold
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, alpha, beta, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
          alpha = max(alpha, bestScore);
          if (beta <= alpha) {
            break; // Beta cutoff
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, alpha, beta, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
          beta = min(beta, bestScore);
          if (beta <= alpha) {
            break; // Alpha cutoff
          }
        }
      }
    }
    return bestScore;
  }
}

function evaluate(board) {
  let score = 0;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 2; j++) {
      score += evaluateLine(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]); // Rows
      score += evaluateLine(board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i]); // Columns
    }
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      score += evaluateLine(board[i][j], board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3]);
    }
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 3; j < 5; j++) {
      score += evaluateLine(board[i][j], board[i + 1][j - 1], board[i + 2][j - 2], board[i + 3][j - 3]);
    }
  }

  return score;
}

function evaluateLine(cell1, cell2, cell3, cell4) {
  let score = 0;

  // AI's moves
  if (cell1 == ai) {
    score = 1;
  } else if (cell1 == human) {
    score = -1;
  }

  if (cell2 == ai) {
    if (score > 0) {
      score *= 10;
    } else if (score < 0) {
      return 0; // Opponent has already blocked, no chance of winning
    } else {
      score = 1;
    }
  } else if (cell2 == human) {
    if (score < 0) {
      score *= 10;
    } else if (score > 1) {
      return 0; // Opponent has already blocked, no chance of winning
    } else {
      score = -1;
    }
  }

  if (cell3 == ai) {
    if (score > 0) {
      score *= 10;
    } else if (score < 0) {
      return 0; // Opponent has already blocked, no chance of winning
    } else {
      score = 1;
    }
  } else if (cell3 == human) {
    if (score < 0) {
      score *= 10;
    } else if (score > 1) {
      return 0; // Opponent has already blocked, no chance of winning
    } else {
      score = -1;
    }
  }

  if (cell4 == ai) {
    if (score > 0) {
      score *= 10;
    } else if (score < 0) {
      return 0; // Opponent has already blocked, no chance of winning
    } else {
      score = 1;
    }
  } else if (cell4 == human) {
    if (score < 0) {
      score *= 10;
    } else if (score > 1) {
      return 0; // Opponent has already blocked, no chance of winning
    } else {
      score = -1;
    }
  }

  return score;
}

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      // Is the spot available?
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, 0, -Infinity, Infinity, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}
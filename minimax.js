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

function evaluateLine(cell1, cell2, cell3, cell4) {
  let computerCount = 0;
  let opponentCount = 0;

  // Count the occurrences of computer and opponent markers
  if (cell1 === 'X') {
    computerCount++;
  } else if (cell1 === 'O') {
    opponentCount++;
  }
  if (cell2 === 'X') {
    computerCount++;
  } else if (cell2 === 'O') {
    opponentCount++;
  }
  if (cell3 === 'X') {
    computerCount++;
  } else if (cell3 === 'O') {
    opponentCount++;
  }
  if (cell4 === 'X') {
    computerCount++;
  } else if (cell4 === 'O') {
    opponentCount++;
  }

  // Calculate the score based on the counts
  if (computerCount === 4) {
    return 100; // Computer wins
  } else if (opponentCount === 4) {
    return -100; // Opponent wins
  } else {
    return computerCount - opponentCount; // RCDC - RCDO evaluation
  }
}

function evaluate(board) {
  let score = 0;

  // Check rows and columns
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 2; j++) {
      score += evaluateLine(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]); // Rows
      score += evaluateLine(board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i]); // Columns
    }
  }

  // Check diagonals
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
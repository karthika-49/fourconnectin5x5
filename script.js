let board = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];
  let ai = 'X';
  let human = 'O';
  let currentPlayer = human;
  let winningCombination = null;

  function setup() {
    createCanvas(450, 450);
    w = width / 5;
    h = height / 5;
    const c = color(255, 204, 0);
    let restartButton = createButton('Restart');
    restartButton.mousePressed(restartGame); 
    restartButton.style('background-color', c); 
    restartButton.style('color', 'black'); 
    restartButton.style('padding', '10px 20px'); 
    restartButton.style('font-size', '16px'); 
    restartButton.style('border', 'none'); 
    restartButton.style('cursor', 'pointer'); 
    resultP = createP('');
    resultP.style('font-size', '20pt'); 
    const cl = color(65);
    resultP.style('color', c); 
    resultP.style('font-family', 'Lucida Console, monospace'); 
    let titleP = createP('');
    titleP.style('color', cl);
    titleP.style('font-family', 'Lucida Console, monospace')
    titleP.html('Four Connect in 5x5')
    titleP.style('font-size', '25pt');
    titleP.style('text-shadow', '2px 2px 5px rgba(0,0,0,0.5)');
console.log(width, height)
    titleP.position(w*6.5, 0); 
 
    bestMove();
  }
  function restartGame() {
    location.reload();
}
function equals4(a, b, c, d) {
  return a == b && b == c && c == d && a != '';
}

function checkWinner() {
  let winner = null;

  // Check horizontal and vertical lines for a winning pattern
  for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 2; j++) {
          if (
              board[i][j] !== '' &&
              board[i][j] === board[i][j + 1] &&
              board[i][j] === board[i][j + 2] &&
              board[i][j] === board[i][j + 3]
          ) {
              winner = board[i][j];
              winningCombination = [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]];
          }
          if (
              board[j][i] !== '' &&
              board[j][i] === board[j + 1][i] &&
              board[j][i] === board[j + 2][i] &&
              board[j][i] === board[j + 3][i]
          ) {
              winner = board[j][i];
              winningCombination = [[j, i], [j + 1, i], [j + 2, i], [j + 3, i]];
          }
      }
  }

  // Check diagonal lines (from top-left to bottom-right)
  for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
          if (
              board[i][j] !== '' &&
              board[i][j] === board[i + 1][j + 1] &&
              board[i][j] === board[i + 2][j + 2] &&
              board[i][j] === board[i + 3][j + 3]
          ) {
              winner = board[i][j];
              winningCombination = [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]];
          }
      }
  }

  // Check diagonal lines (from top-right to bottom-left)
  for (let i = 0; i < 2; i++) {
      for (let j = 3; j < 5; j++) {
          if (
              board[i][j] !== '' &&
              board[i][j] === board[i + 1][j - 1] &&
              board[i][j] === board[i + 2][j - 2] &&
              board[i][j] === board[i + 3][j - 3]
          ) {
              winner = board[i][j];
              winningCombination = [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]];
          }
      }
  }

  // Check for a tie
  let openSpots = 0;
  for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
          if (board[i][j] == '') {
              openSpots++;
          }
      }
  }
  if (winner == null && openSpots == 0) {
      return 'tie';
  } else {
      return winner;
  }
}

  
  function mousePressed() {
    if (currentPlayer == human) {
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      if (board[i][j] == '') {
        board[i][j] = human;
        currentPlayer = ai;
        bestMove();
      }
    }
  }
  

function draw() {
    background(255); 
    c = color('hsba(160, 100%, 50%, 0.5)');
    fill(c);
    noStroke(); 
    rect(0, 0, width, height);
    stroke(0); 
    strokeWeight(4);
    for (let i = 0; i <= 5; i++) {
        line(i * w, 0, i * w, height);
    }

    for (let j = 0; j <= 5; j++) {
        line(0, j * h, width, j * h);
    }

    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];
            textSize(32);
            let r = w / 4;
            if (spot == human) {
                noFill();
                ellipse(x, y, r * 2);
            } else if (spot == ai) {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }
    
    let result = checkWinner();
    if (result != null) {
      noLoop();
    
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        resultP.html(`${result} wins!`);
      }
      if (winningCombination !== null && result!=='tie') {
        strokeWeight(10);
        stroke(0, 255, 0);
        noFill();
        beginShape();
        for (let [i, j] of winningCombination) {
          let x = w * i + w / 2;
            let y = h * j + h / 2;
          vertex(x, y);
        }
        endShape();
      }
    }
  
    }
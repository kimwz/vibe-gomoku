// Check if there's a winner (5 in a row)
export const checkWinner = (
  board: (0 | 1 | 2)[][],
  row: number,
  col: number,
  player: 1 | 2
): boolean => {
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal down-right
    [1, -1],  // diagonal down-left
  ];

  for (const [dx, dy] of directions) {
    let count = 1; // Start with 1 for the current stone

    // Check in positive direction
    for (let i = 1; i <= 4; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;
      
      if (
        newRow >= 0 && 
        newRow < board.length && 
        newCol >= 0 && 
        newCol < board[0].length && 
        board[newRow][newCol] === player
      ) {
        count++;
      } else {
        break;
      }
    }

    // Check in negative direction
    for (let i = 1; i <= 4; i++) {
      const newRow = row - i * dx;
      const newCol = col - i * dy;
      
      if (
        newRow >= 0 && 
        newRow < board.length && 
        newCol >= 0 && 
        newCol < board[0].length && 
        board[newRow][newCol] === player
      ) {
        count++;
      } else {
        break;
      }
    }

    // If 5 or more in a row, we have a winner
    if (count >= 5) {
      return true;
    }
  }

  return false;
};

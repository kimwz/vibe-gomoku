import { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import { checkWinner } from "./utils/gameLogic";

function App() {
  const BOARD_SIZE = 15;
  const [board, setBoard] = useState<(0 | 1 | 2)[][]>(
    Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<0 | 1 | 2>(0);
  const [gameHistory, setGameHistory] = useState<{row: number, col: number, player: 1 | 2}[]>([]);
  const [lastMove, setLastMove] = useState<{row: number, col: number} | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== 0 || winner !== 0) return;

    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    setLastMove({row, col});
    
    // Add move to history
    setGameHistory([...gameHistory, {row, col, player: currentPlayer}]);

    // Check for winner
    const gameWinner = checkWinner(newBoard, row, col, currentPlayer);
    if (gameWinner) {
      setWinner(currentPlayer);
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0)));
    setCurrentPlayer(1);
    setWinner(0);
    setGameHistory([]);
    setLastMove(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">오목 (Omok)</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <Board 
            board={board} 
            onCellClick={handleCellClick} 
            lastMove={lastMove}
          />
        </div>
        
        <GameInfo 
          currentPlayer={currentPlayer} 
          winner={winner} 
          resetGame={resetGame}
          gameHistory={gameHistory}
        />
      </div>
    </div>
  );
}

export default App;

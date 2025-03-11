import React from "react";

interface GameInfoProps {
  currentPlayer: 1 | 2;
  winner: 0 | 1 | 2;
  resetGame: () => void;
  gameHistory: {row: number, col: number, player: 1 | 2}[];
}

const GameInfo: React.FC<GameInfoProps> = ({ 
  currentPlayer, 
  winner, 
  resetGame,
  gameHistory
}) => {
  // Convert row/col to board notation (A1, B2, etc.)
  const getNotation = (row: number, col: number) => {
    const colLetter = String.fromCharCode(65 + col); // A, B, C, ...
    return `${colLetter}${row + 1}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-64">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Game Info</h2>
        
        {winner === 0 ? (
          <div className="flex items-center mb-2">
            <span className="mr-2">Current Player:</span>
            <div 
              className={`w-6 h-6 rounded-full ${
                currentPlayer === 1 ? 'bg-black' : 'bg-white border border-black'
              }`}
            ></div>
          </div>
        ) : (
          <div className="mb-2">
            <div className="flex items-center">
              <span className="mr-2">Winner:</span>
              <div 
                className={`w-6 h-6 rounded-full ${
                  winner === 1 ? 'bg-black' : 'bg-white border border-black'
                }`}
              ></div>
            </div>
            <p className="text-green-600 font-bold mt-1">
              {winner === 1 ? 'Black' : 'White'} wins!
            </p>
          </div>
        )}
        
        <button 
          onClick={resetGame}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Game
        </button>
      </div>
      
      <div>
        <h3 className="font-bold mb-2">Move History</h3>
        <div className="max-h-60 overflow-y-auto">
          {gameHistory.length === 0 ? (
            <p className="text-gray-500 italic">No moves yet</p>
          ) : (
            <ul className="space-y-1">
              {gameHistory.map((move, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">{index + 1}.</span>
                  <div 
                    className={`w-4 h-4 rounded-full mr-2 ${
                      move.player === 1 ? 'bg-black' : 'bg-white border border-black'
                    }`}
                  ></div>
                  <span>{getNotation(move.row, move.col)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameInfo;

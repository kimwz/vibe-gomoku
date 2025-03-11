import React from "react";

interface CellProps {
  value: 0 | 1 | 2;
  onClick: () => void;
  isLastMove: boolean;
  row: number;
  col: number;
  boardSize: number;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isLastMove, row, col, boardSize }) => {
  // Determine if this cell should render grid lines
  const isFirstRow = row === 0;
  const isLastRow = row === boardSize - 1;
  const isFirstCol = col === 0;
  const isLastCol = col === boardSize - 1;
  
  // Determine if this is a star point (화점)
  const isStarPoint = (
    // Center point
    (row === Math.floor(boardSize / 2) && col === Math.floor(boardSize / 2)) ||
    // Corner star points (for 15x15 or 19x19 boards)
    (boardSize >= 15 && (
      // Top-left
      (row === 3 && col === 3) ||
      // Top-right
      (row === 3 && col === boardSize - 4) ||
      // Bottom-left
      (row === boardSize - 4 && col === 3) ||
      // Bottom-right
      (row === boardSize - 4 && col === boardSize - 4) ||
      // Middle points
      (row === 3 && col === Math.floor(boardSize / 2)) ||
      (row === Math.floor(boardSize / 2) && col === 3) ||
      (row === boardSize - 4 && col === Math.floor(boardSize / 2)) ||
      (row === Math.floor(boardSize / 2) && col === boardSize - 4)
    ))
  );

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ 
        width: "30px", 
        height: "30px",
      }}
      onClick={onClick}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black"></div>
      </div>

      {/* Star point */}
      {isStarPoint && (
        <div className="absolute w-2 h-2 bg-black rounded-full"></div>
      )}

      {/* Stone */}
      {value !== 0 && (
        <div 
          className={`absolute w-5/6 h-5/6 rounded-full ${
            value === 1 ? 'bg-black' : 'bg-white border border-black'
          } ${isLastMove ? 'ring-2 ring-red-500' : ''}`}
        ></div>
      )}
    </div>
  );
};

export default Cell;

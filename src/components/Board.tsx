import React from "react";
import Cell from "./Cell";

interface BoardProps {
  board: (0 | 1 | 2)[][];
  onCellClick: (row: number, col: number) => void;
  lastMove: {row: number, col: number} | null;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, lastMove }) => {
  return (
    <div className="relative">
      {/* Board grid lines */}
      <div className="absolute inset-0 bg-amber-200 z-0"></div>
      <div className="grid relative z-10" 
        style={{ 
          gridTemplateColumns: `repeat(${board[0].length}, 30px)`,
          gridTemplateRows: `repeat(${board.length}, 30px)`,
        }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isLastMove={lastMove?.row === rowIndex && lastMove?.col === colIndex}
              row={rowIndex}
              col={colIndex}
              boardSize={board.length}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;

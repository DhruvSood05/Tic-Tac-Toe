import React from 'react';
import Cell from './Cell';

const Board = ({ board, onMakeMove, isMyTurn, gameActive }) => {
  return (
    <div className="w-full max-w-[300px] sm:max-w-[360px] mx-auto tic-tac-board grid grid-cols-3 grid-rows-3 gap-0">
      {board.map((cellValue, index) => {
        // Can only click if game is active, it's my turn, and cell is empty
        const isDisabled = !gameActive || !isMyTurn || cellValue !== "";
        
        return (
          <Cell 
            key={index} 
            index={index}
            value={cellValue} 
            onClick={() => onMakeMove(index)}
            disabled={isDisabled}
          />
        );
      })}
    </div>
  );
};

export default Board;

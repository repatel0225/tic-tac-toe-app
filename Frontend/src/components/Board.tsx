import React from 'react';
import { Cell } from './Cell';
import type { Player } from '../types';

interface BoardProps {
  board: (Player | null)[];
  winningCells: number[];
  disabled: boolean;
  onCellClick: (index: number) => void;
}

export const Board: React.FC<BoardProps> = ({
  board,
  winningCells,
  disabled,
  onCellClick,
}) => {
  return (
    <div className="board-wrapper">
      <div className="board-grid">
        {board.map((val, idx) => (
          <Cell
            key={idx}
            index={idx}
            value={val}
            isWinningCell={winningCells.includes(idx)}
            disabled={disabled}
            onClick={onCellClick}
          />
        ))}
      </div>
    </div>
  );
};
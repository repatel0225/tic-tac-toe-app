import React from 'react';
import type { Player } from '../types';

interface CellProps {
  value: Player | null;
  index: number;
  isWinningCell: boolean;
  disabled: boolean;
  onClick: (index: number) => void;
}

export const Cell: React.FC<CellProps> = ({
  value,
  index,
  isWinningCell,
  disabled,
  onClick,
}) => {
  const getCellClassName = () => {
    if (isWinningCell) return 'cell-button cell-winning';
    if (value) return 'cell-button cell-filled';
    return 'cell-button cell-empty';
  };

  return (
    <button
      type="button"
      disabled={disabled || value !== null}
      onClick={() => onClick(index)}
      className={getCellClassName()}
    >
      <span className={value === 'X' ? 'player-x' : value === 'O' ? 'player-o' : ''}>
        {value}
      </span>
    </button>
  );
};
import React from 'react';
import type { GameMode, GameStatus, Player } from '../types';
import { RotateCcw, Undo2, Users, Bot } from 'lucide-react';

interface ControlsProps {
  mode: GameMode;
  status: GameStatus;
  winner: Player | null;
  currentPlayer: Player;
  moveCount: number;
  onModeChange: (newMode: GameMode) => void;
  onUndo: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  mode,
  status,
  winner,
  currentPlayer,
  moveCount,
  onModeChange,
  onUndo,
  onReset,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          type="button"
          onClick={() => onModeChange('TWO_PLAYER')}
          className={`mode-tab ${mode === 'TWO_PLAYER' ? 'mode-tab-active' : 'mode-tab-inactive'}`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>2 Player</span>
        </button>
        <button
          type="button"
          onClick={() => onModeChange('COMPUTER')}
          className={`mode-tab ${mode === 'COMPUTER' ? 'mode-tab-active' : 'mode-tab-inactive'}`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>vs Computer</span>
        </button>
      </div>

      <div className="card-panel text-center text-sm font-medium">
        {status === 'Won' ? (
          <span className="text-emerald-400 font-bold">Player {winner} Won!</span>
        ) : status === 'Draw' ? (
          <span className="text-slate-300 font-bold">Game Drawn!</span>
        ) : (
          <span>
            Current Turn:{' '}
            <strong className={currentPlayer === 'X' ? 'player-x' : 'player-o'}>
              Player {currentPlayer}
            </strong>
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={status !== 'InProgress' || moveCount === 0}
          className="action-btn"
        >
          <Undo2 className="w-4 h-4" />
          <span>Undo</span>
        </button>
        <button type="button" onClick={onReset} className="action-btn">
          <RotateCcw className="w-4 h-4" />
          <span>Restart</span>
        </button>
      </div>
    </div>
  );
};
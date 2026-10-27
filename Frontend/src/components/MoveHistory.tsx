import React from 'react';
import type { IMove } from '../types/game.types';
import { History } from 'lucide-react';

interface MoveHistoryProps {
  moves: IMove[];
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  return (
    <div className="card-panel max-h-48 overflow-y-auto">
      <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-700/60 text-xs font-bold uppercase tracking-wider text-slate-300">
        <History className="w-4 h-4" />
        <span>Move Log ({moves.length})</span>
      </div>

      {moves.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-3">No moves made</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {moves.map((m) => (
            <div
              key={m.moveNumber}
              className="flex justify-between items-center text-xs py-1.5 px-3 rounded-lg bg-slate-800/50"
            >
              <span className="text-slate-400 font-medium">#{m.moveNumber}</span>
              <span className="font-semibold text-slate-200">
                <span className={m.player === 'X' ? 'player-x' : 'player-o'}>
                  Player {m.player}
                </span>{' '}
                → [{m.row + 1}, {m.col + 1}]
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
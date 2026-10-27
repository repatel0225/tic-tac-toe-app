import React from 'react';
import type { IMove } from '../types';
import { History } from 'lucide-react';

interface MoveHistoryProps {
  moves: IMove[];
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  return (
    <div className="card-panel max-h-40 overflow-y-auto">
      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-700/60 text-xs font-semibold text-slate-400">
        <History className="w-3.5 h-3.5" />
        <span>Move Log ({moves.length})</span>
      </div>

      {moves.length === 0 ? (
        <p className="text-xs text-slate-500 text-center py-2">No moves made</p>
      ) : (
        <div className="flex flex-col gap-1">
          {moves.map((m) => (
            <div
              key={m.moveNumber}
              className="flex justify-between items-center text-xs py-1 px-2 rounded bg-slate-800/40"
            >
              <span className="text-slate-400">#{m.moveNumber}</span>
              <span>
                <strong className={m.player === 'X' ? 'player-x' : 'player-o'}>
                  Player {m.player}
                </strong>{' '}
                at [{m.row + 1}, {m.col + 1}]
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
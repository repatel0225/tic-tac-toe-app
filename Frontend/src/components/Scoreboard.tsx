import React from 'react';
import type { IScoreboard } from '../types';
import { Trophy, RotateCcw } from 'lucide-react';

interface ScoreboardProps {
  scoreboard: IScoreboard;
  onReset: () => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ scoreboard, onReset }) => {
  return (
    <div className="card-panel">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Scoreboard</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-800/40 rounded-lg p-2 border border-sky-500/20">
          <span className="text-[11px] font-semibold text-sky-400 block">Player X</span>
          <span className="text-xl font-bold">{scoreboard.xWins}</span>
        </div>
        <div className="bg-slate-800/40 rounded-lg p-2 border border-slate-700/50">
          <span className="text-[11px] font-semibold text-slate-400 block">Draws</span>
          <span className="text-xl font-bold">{scoreboard.draws}</span>
        </div>
        <div className="bg-slate-800/40 rounded-lg p-2 border border-amber-500/20">
          <span className="text-[11px] font-semibold text-amber-400 block">Player O</span>
          <span className="text-xl font-bold">{scoreboard.oWins}</span>
        </div>
      </div>
    </div>
  );
};
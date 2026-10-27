import React from 'react';
import type { IScoreboard } from '../types/game.types';
import { Trophy, RotateCcw } from 'lucide-react';

interface ScoreboardProps {
  scoreboard: IScoreboard;
  onReset: () => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ scoreboard, onReset }) => {
  return (
    <div className="card-panel">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-200 tracking-wider uppercase">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Scoreboard</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="score-badge border-cyan-500/30">
          <span className="score-badge-label text-cyan-400">Player X</span>
          <span className="score-badge-value text-slate-100">{scoreboard.xWins}</span>
        </div>
        <div className="score-badge border-slate-700/60">
          <span className="score-badge-label text-slate-300">Draws</span>
          <span className="score-badge-value text-slate-100">{scoreboard.draws}</span>
        </div>
        <div className="score-badge border-amber-500/30">
          <span className="score-badge-label text-amber-400">Player O</span>
          <span className="score-badge-value text-slate-100">{scoreboard.oWins}</span>
        </div>
      </div>
    </div>
  );
};
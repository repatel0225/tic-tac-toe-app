import React from 'react';
import { useTicTacToe } from './hooks/useTicTacToe';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { Scoreboard } from './components/Scoreboard';
import { MoveHistory } from './components/MoveHistory';

export const App: React.FC = () => {
  const {
    game,
    scoreboard,
    isLoading,
    errorMessage,
    onCellSelect,
    onUndo,
    onResetBoard,
    onModeChange,
    onResetScoreboard,
  } = useTicTacToe();

  if (isLoading && !game) {
    return (
      <div className="app-wrapper">
        <p className="text-slate-400 animate-pulse text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <div className="game-container">
        <header className="text-center">
          <h1 className="text-2xl font-black tracking-wider text-slate-100">
            TIC TAC TOE
          </h1>
        </header>

        {errorMessage && (
          <div className="p-2 text-xs text-center rounded-lg bg-rose-950/70 border border-rose-800 text-rose-300">
            {errorMessage}
          </div>
        )}

        <Scoreboard
          scoreboard={scoreboard}
          onReset={onResetScoreboard}
        />

        {game && (
          <>
            <Controls
              mode={game.mode}
              status={game.status}
              winner={game.winner}
              currentPlayer={game.currentPlayer}
              moveCount={game.moves.length}
              onModeChange={onModeChange}
              onUndo={onUndo}
              onReset={onResetBoard}
            />

            <Board
              board={game.board}
              winningCells={game.winningCells}
              disabled={game.status !== 'InProgress'}
              onCellClick={onCellSelect}
            />

            <MoveHistory moves={game.moves} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
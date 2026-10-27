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
      <div className="layout-screen">
        <p className="loading-indicator">Loading...</p>
      </div>
    );
  }

  return (
    <div className="layout-screen">
      <div className="layout-container">
        <header className="layout-header">
          <h1 className="header-title">TIC TAC TOE</h1>
        </header>

        {errorMessage && (
          <div className="error-banner">
            {errorMessage}
          </div>
        )}

        {game && (
          <main className="layout-body">
            <section className="left-game-section">
              <Board
                board={game.board}
                winningCells={game.winningCells}
                disabled={game.status !== 'InProgress'}
                onCellClick={onCellSelect}
              />
            </section>

            <section className="right-panel-section">
              <Scoreboard
                scoreboard={scoreboard}
                onReset={onResetScoreboard}
              />

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

              <MoveHistory moves={game.moves} />
            </section>
          </main>
        )}
      </div>
    </div>
  );
};

export default App;
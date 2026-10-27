import { useState, useEffect, useCallback } from 'react';
import type { GameMode, IGame, IScoreboard } from '../types';
import * as gameService from '../services/gameService';

export const useTicTacToe = () => {
  const [game, setGame] = useState<IGame | null>(null);
  const [scoreboard, setScoreboard] = useState<IScoreboard>({ xWins: 0, oWins: 0, draws: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startNewGame = useCallback(async (mode: GameMode = 'TWO_PLAYER') => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await gameService.createGame(mode);
      setGame(data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error starting game');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadScoreboard = useCallback(async () => {
    try {
      const data = await gameService.getScoreboard();
      setScoreboard(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    startNewGame('TWO_PLAYER');
    loadScoreboard();
  }, [startNewGame, loadScoreboard]);

  const onCellSelect = async (cellIndex: number) => {
    if (!game || game.status !== 'InProgress' || game.board[cellIndex] !== null) {
      return;
    }

    const row = Math.floor(cellIndex / 3);
    const col = cellIndex % 3;

    try {
      setErrorMessage(null);
      const updated = await gameService.submitMove(game._id, game.currentPlayer, row, col);
      setGame(updated);

      if (updated.status !== 'InProgress') {
        loadScoreboard();
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Move rejected');
    }
  };

  const onUndo = async () => {
    if (!game || game.status !== 'InProgress' || game.moves.length === 0) {
      return;
    }

    try {
      setErrorMessage(null);
      const updated = await gameService.undoMove(game._id);
      setGame(updated);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Cannot undo move');
    }
  };

  const onResetBoard = async () => {
    if (!game) return;

    try {
      setErrorMessage(null);
      const updated = await gameService.resetGame(game._id);
      setGame(updated);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Cannot reset board');
    }
  };

  const onModeChange = (mode: GameMode) => {
    startNewGame(mode);
  };

  const onResetScoreboard = async () => {
    try {
      const data = await gameService.resetScoreboard();
      setScoreboard(data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Cannot reset scoreboard');
    }
  };

  return {
    game,
    scoreboard,
    isLoading,
    errorMessage,
    onCellSelect,
    onUndo,
    onResetBoard,
    onModeChange,
    onResetScoreboard,
  };
};
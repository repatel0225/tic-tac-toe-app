import type { ApiResponse, GameMode, IGame, IScoreboard, Player } from '../types';

const BASE_URL = 'http://localhost:5000/api';

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const body: ApiResponse<T> = await response.json();

  if (!response.ok || !body.success) {
    throw new Error(body.error?.message || 'Request failed');
  }

  return body.data;
};

export const createGame = (mode: GameMode = 'TWO_PLAYER'): Promise<IGame> =>
  request<IGame>('/games', {
    method: 'POST',
    body: JSON.stringify({ mode }),
  });

export const submitMove = (
  gameId: string,
  player: Player,
  row: number,
  col: number
): Promise<IGame> =>
  request<IGame>(`/games/${gameId}/moves`, {
    method: 'POST',
    body: JSON.stringify({ player, row, col }),
  });

export const undoMove = (gameId: string): Promise<IGame> =>
  request<IGame>(`/games/${gameId}/undo`, {
    method: 'POST',
  });

export const resetGame = (gameId: string): Promise<IGame> =>
  request<IGame>(`/games/${gameId}/reset`, {
    method: 'POST',
  });

export const getScoreboard = (): Promise<IScoreboard> =>
  request<IScoreboard>('/scoreboard');

export const resetScoreboard = (): Promise<IScoreboard> =>
  request<IScoreboard>('/scoreboard/reset', {
    method: 'POST',
  });
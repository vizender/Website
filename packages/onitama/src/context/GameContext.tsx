import { createContext, useContext, type ReactNode } from 'react';
import type { CardName } from '../game/cards';
import type { Position, PlayerColor } from '../game/boardUtils';
import { useGameState } from '../game/useGameState';

export interface GameContextValue {
  board: ReturnType<typeof useGameState>['board'];
  blueCards: ReturnType<typeof useGameState>['blueCards'];
  redCards: ReturnType<typeof useGameState>['redCards'];
  neutralCard: ReturnType<typeof useGameState>['neutralCard'];
  currentPlayer: PlayerColor;
  selectedCard: CardName | null;
  selectedPiece: Position | null;
  validMoves: Position[];
  winner: PlayerColor | null;
  selectCard: (card: CardName) => void;
  selectPiece: (pos: Position) => void;
  selectDestination: (pos: Position) => void;
  resetGame: () => void;
  cellClick: (pos: Position) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const state = useGameState();
  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

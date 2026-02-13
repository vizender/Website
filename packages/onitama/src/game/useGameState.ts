import { useState, useCallback } from 'react';
import type { CardName } from './cards';
import { drawRandomCards } from './cards';
import type { Board, Position, PlayerColor } from './boardUtils';
import {
  createInitialBoard,
  getValidMoves,
  executeMove,
  checkVictory,
} from './boardUtils';

export interface GameState {
  board: Board;
  blueCards: [CardName, CardName];
  redCards: [CardName, CardName];
  neutralCard: CardName;
  currentPlayer: PlayerColor;
  selectedCard: CardName | null;
  selectedPiece: Position | null;
  validMoves: Position[];
  winner: PlayerColor | null;
}

function initGame(): GameState {
  const five = drawRandomCards(5);
  const [c1, c2, c3, c4, c5] = five;
  return {
    board: createInitialBoard(),
    blueCards: [c1, c2],
    redCards: [c3, c4],
    neutralCard: c5,
    currentPlayer: 'blue',
    selectedCard: null,
    selectedPiece: null,
    validMoves: [],
    winner: null,
  };
}

export function useGameState() {
  const [state, setState] = useState<GameState>(initGame);

  const selectCard = useCallback((card: CardName) => {
    setState((s) => {
      if (s.winner) return s;
      const isBlueTurn = s.currentPlayer === 'blue';
      const hasCard = isBlueTurn
        ? s.blueCards.includes(card)
        : s.redCards.includes(card);
      if (!hasCard) return s;

      const validMoves = s.selectedPiece
        ? getValidMoves(s.board, card, s.selectedPiece, s.currentPlayer)
        : [];

      return {
        ...s,
        selectedCard: card,
        validMoves,
      };
    });
  }, []);

  const selectPiece = useCallback((pos: Position) => {
    setState((s) => {
      if (s.winner) return s;
      const piece = s.board[pos.row][pos.col];
      if (!piece || piece.color !== s.currentPlayer) return s;

      const validMoves = s.selectedCard
        ? getValidMoves(s.board, s.selectedCard, pos, s.currentPlayer)
        : [];

      return {
        ...s,
        selectedPiece: pos,
        validMoves,
      };
    });
  }, []);

  const selectDestination = useCallback((pos: Position) => {
    setState((s) => {
      if (s.winner || !s.selectedCard || !s.selectedPiece) return s;
      const isValid = s.validMoves.some((m) => m.row === pos.row && m.col === pos.col);
      if (!isValid) return s;

      const newBoard = executeMove(s.board, s.selectedPiece, pos);
      const winner = checkVictory(newBoard);

      // Swap cards: used card goes to neutral, neutral goes to current player
      const isBlue = s.currentPlayer === 'blue';
      const [cardA, cardB] = isBlue ? s.blueCards : s.redCards;
      const usedCard = s.selectedCard;
      const newNeutral = usedCard;
      const newHand = cardA === usedCard ? [s.neutralCard, cardB] : [cardA, s.neutralCard];

      const nextPlayer: PlayerColor = s.currentPlayer === 'blue' ? 'red' : 'blue';

      return {
        ...s,
        board: newBoard,
        blueCards: isBlue ? (newHand as [CardName, CardName]) : s.blueCards,
        redCards: !isBlue ? (newHand as [CardName, CardName]) : s.redCards,
        neutralCard: newNeutral,
        currentPlayer: nextPlayer,
        selectedCard: null,
        selectedPiece: null,
        validMoves: [],
        winner: winner ?? null,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(initGame());
  }, []);

  const cellClick = useCallback(
    (pos: Position) => {
      const piece = state.board[pos.row][pos.col];
      const isOwnPiece = piece?.color === state.currentPlayer;
      const isValidDest = state.validMoves.some((m) => m.row === pos.row && m.col === pos.col);

      if (state.validMoves.length > 0 && isValidDest) {
        selectDestination(pos);
      } else if (isOwnPiece) {
        selectPiece(pos);
      }
    },
    [state, selectDestination, selectPiece]
  );

  return {
    ...state,
    selectCard,
    selectPiece,
    selectDestination,
    resetGame,
    cellClick,
  };
}

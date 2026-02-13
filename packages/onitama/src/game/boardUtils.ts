import type { CardName } from './cards';
import { getMovesForCard } from './cards';

export type PlayerColor = 'blue' | 'red';
export type PieceType = 'king' | 'pawn';

export interface Piece {
  type: PieceType;
  color: PlayerColor;
}

export type Cell = Piece | null;
export type Board = Cell[][];

export interface Position {
  row: number;
  col: number;
}

const BOARD_SIZE = 5;

export const BLUE_TEMPLE: Position = { row: 0, col: 2 };
export const RED_TEMPLE: Position = { row: 4, col: 2 };

function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null)
  );
}

export function createInitialBoard(): Board {
  const board = createEmptyBoard();
  // Blue: row 0, king at (0,2), pawns at (0,0),(0,1),(0,3),(0,4)
  board[0][0] = { type: 'pawn', color: 'blue' };
  board[0][1] = { type: 'pawn', color: 'blue' };
  board[0][2] = { type: 'king', color: 'blue' };
  board[0][3] = { type: 'pawn', color: 'blue' };
  board[0][4] = { type: 'pawn', color: 'blue' };
  // Red: row 4, king at (4,2), pawns at (4,0),(4,1),(4,3),(4,4)
  board[4][0] = { type: 'pawn', color: 'red' };
  board[4][1] = { type: 'pawn', color: 'red' };
  board[4][2] = { type: 'king', color: 'red' };
  board[4][3] = { type: 'pawn', color: 'red' };
  board[4][4] = { type: 'pawn', color: 'red' };
  return board;
}

function isInBounds(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

/**
 * Transform relative move for player.
 * Cartes: "haut" = dRow négatif, "gauche" = dCol négatif (perspective CardTester, row 0 en haut).
 * En jeu: Bleu en bas, Rouge en haut. Bleu voit plateau flip → "haut" = row 4, "gauche" = col 4.
 * Donc pour Bleu on inverse les deux (row et col). Rouge: plateau non flip, moves tels quels.
 */
function getAbsoluteMoves(
  cardName: CardName,
  player: PlayerColor,
  fromRow: number,
  fromCol: number,
  gamePerspective: boolean
): Position[] {
  const moves = getMovesForCard(cardName);
  const mult = gamePerspective && player === 'blue' ? -1 : 1;
  return moves.map(([dRow, dCol]) => ({
    row: fromRow + dRow * mult,
    col: fromCol + dCol * mult,
  }));
}

export function getValidMoves(
  board: Board,
  cardName: CardName,
  from: Position,
  player: PlayerColor,
  gamePerspective = true
): Position[] {
  const piece = board[from.row][from.col];
  if (!piece || piece.color !== player) return [];

  const candidates = getAbsoluteMoves(cardName, player, from.row, from.col, gamePerspective);

  return candidates.filter((pos) => {
    if (!isInBounds(pos.row, pos.col)) return false;
    const cell = board[pos.row][pos.col];
    if (cell?.color === player) return false; // no friendly capture
    return true;
  });
}

export function executeMove(
  board: Board,
  from: Position,
  to: Position
): Board {
  const newBoard = board.map((row) => row.map((cell) => cell));
  const piece = newBoard[from.row][from.col];
  if (!piece) return newBoard;

  newBoard[from.row][from.col] = null;
  newBoard[to.row][to.col] = piece;
  return newBoard;
}

export function checkVictory(board: Board): PlayerColor | null {
  // Way of the Stone: opponent's king captured
  let blueKingExists = false;
  let redKingExists = false;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const p = board[r][c];
      if (p?.type === 'king') {
        if (p.color === 'blue') blueKingExists = true;
        else redKingExists = true;
      }
    }
  }
  if (!redKingExists) return 'blue';
  if (!blueKingExists) return 'red';

  // Way of the Stream: current player's king reached opponent's temple
  const blueKingAtRedTemple =
    board[RED_TEMPLE.row][RED_TEMPLE.col]?.type === 'king' &&
    board[RED_TEMPLE.row][RED_TEMPLE.col]?.color === 'blue';
  const redKingAtBlueTemple =
    board[BLUE_TEMPLE.row][BLUE_TEMPLE.col]?.type === 'king' &&
    board[BLUE_TEMPLE.row][BLUE_TEMPLE.col]?.color === 'red';

  if (blueKingAtRedTemple) return 'blue';
  if (redKingAtBlueTemple) return 'red';

  return null;
}

export function getPiecesForPlayer(
  board: Board,
  player: PlayerColor
): Position[] {
  const positions: Position[] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const p = board[r][c];
      if (p?.color === player) positions.push({ row: r, col: c });
    }
  }
  return positions;
}

export function isTemplePosition(pos: Position): boolean {
  return (
    (pos.row === BLUE_TEMPLE.row && pos.col === BLUE_TEMPLE.col) ||
    (pos.row === RED_TEMPLE.row && pos.col === RED_TEMPLE.col)
  );
}

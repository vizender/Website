import type { Board as BoardType, Position } from '../game/boardUtils';
import { BLUE_TEMPLE, RED_TEMPLE } from '../game/boardUtils';
import { Piece } from './Piece';
import './Board.css';

interface BoardProps {
  board: BoardType;
  currentPlayer: 'blue' | 'red';
  winner: 'blue' | 'red' | null;
  selectedPiece: Position | null;
  validMoves: Position[];
  onCellClick: (pos: Position) => void;
}

function isTemple(pos: Position): 'up' | 'down' | null {
  if (pos.row === BLUE_TEMPLE.row && pos.col === BLUE_TEMPLE.col) return 'up';
  if (pos.row === RED_TEMPLE.row && pos.col === RED_TEMPLE.col) return 'down';
  return null;
}

export function Board({
  board,
  currentPlayer,
  winner,
  selectedPiece,
  validMoves,
  onCellClick,
}: BoardProps) {
  const isFlipped = winner ? winner === 'blue' : currentPlayer === 'blue';

  return (
    <div className={`board-container ${isFlipped ? 'board-flipped' : ''}`}>
      <div className="board" data-flipped={isFlipped}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const pos: Position = { row: rowIndex, col: colIndex };
            const temple = isTemple(pos);
            const isValidMove = validMoves.some(
              (m) => m.row === rowIndex && m.col === colIndex
            );
            const isSelected =
              selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
            const targetPiece = cell;
            const isCapture = isValidMove && targetPiece && targetPiece.color !== currentPlayer;

            let cellClass = 'cell';
            if (temple) cellClass += ` cell-temple cell-temple-${temple}`;
            if (isValidMove) cellClass += isCapture ? ' cell-valid-capture' : ' cell-valid-move';
            if (isSelected) cellClass += ' cell-selected';

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cellClass}
                data-row={rowIndex}
                data-col={colIndex}
                onClick={() => onCellClick(pos)}
                role="gridcell"
              >
                {temple === 'up' && (
                  <img
                    src="/images/pions/Case_Castle_Up.png"
                    alt=""
                    className="cell-bg"
                    draggable={false}
                  />
                )}
                {temple === 'down' && (
                  <img
                    src="/images/pions/Case_Castle_Down.png"
                    alt=""
                    className="cell-bg"
                    draggable={false}
                  />
                )}
                {!temple && (
                  <img
                    src="/images/pions/Case_Vide.png"
                    alt=""
                    className="cell-bg"
                    draggable={false}
                  />
                )}
                {cell && (
                  <Piece
                    piece={cell}
                    position={pos}
                    isSelected={isSelected}
                    onClick={() => onCellClick(pos)}
                  />
                )}
                {isCapture && <div className="cell-capture-overlay" aria-hidden />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

import type { Piece as PieceData, Position } from '../game/boardUtils';

interface PieceProps {
  piece: PieceData;
  position: Position;
  isSelected?: boolean;
  onClick?: () => void;
}

const PIECE_IMAGES: Record<string, string> = {
  king_blue: '/images/pions/Roi_Bleu.png',
  king_red: '/images/pions/Roi_Rouge.png',
  pawn_blue: '/images/pions/Pion_Bleu.png',
  pawn_red: '/images/pions/Pion_Rouge.png',
};

export function Piece({ piece, position, isSelected, onClick }: PieceProps) {
  const key = `${piece.type}_${piece.color}`;
  const src = PIECE_IMAGES[key];

  return (
    <div
      className="piece"
      data-position-row={position.row}
      data-position-col={position.col}
      data-selected={isSelected}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {src && <img src={src} alt={piece.type} draggable={false} />}
    </div>
  );
}

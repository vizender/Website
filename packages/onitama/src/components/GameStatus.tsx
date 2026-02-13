import type { CardName } from '../game/cards';
import './GameStatus.css';

interface GameStatusProps {
  currentPlayer: 'blue' | 'red';
  winner: 'blue' | 'red' | null;
  selectedCard: CardName | null;
  selectedPiece: { row: number; col: number } | null;
  onReset: () => void;
}

export function GameStatus({ currentPlayer, winner, selectedCard, selectedPiece, onReset }: GameStatusProps) {
  const hasBoth = selectedCard && selectedPiece;
  const hasNone = !selectedCard && !selectedPiece;

  return (
    <div className="game-status">
      {winner ? (
        <div className="status-message status-winner">
          Victoire du joueur {winner === 'blue' ? 'Bleu' : 'Rouge'} !
        </div>
      ) : (
        <>
          <div className="status-message">
            Au tour du joueur {currentPlayer === 'blue' ? 'Bleu' : 'Rouge'}
          </div>
          {!hasBoth && (
            <div className="status-hint">
              {hasNone
                ? 'Sélectionnez une pièce et une carte (dans l\'ordre que vous voulez), puis la case de destination.'
                : !selectedCard
                  ? 'Sélectionnez une carte pour voir les mouvements.'
                  : 'Sélectionnez une pièce pour voir les mouvements.'}
            </div>
          )}
        </>
      )}
      <button type="button" className="btn-reset" onClick={onReset}>
        Nouvelle partie
      </button>
    </div>
  );
}

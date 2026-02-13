import type { ReactNode } from 'react';
import type { CardName } from '../game/cards';
import './CardHand.css';

interface CardHandProps {
  currentPlayerCards: [CardName, CardName];
  waitingPlayerCards: [CardName, CardName];
  neutralCard: CardName;
  currentPlayer: 'blue' | 'red';
  selectedCard: CardName | null;
  onSelectCard: (card: CardName) => void;
  children?: ReactNode;
}

function Card({
  name,
  isSelected,
  onClick,
  disabled,
}: {
  name: CardName;
  isSelected: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="card-wrapper">
      <button
        type="button"
        className={`card card-horizontal ${isSelected ? 'card-selected' : ''} ${disabled ? 'card-disabled' : ''}`}
        onClick={disabled ? undefined : onClick}
        data-card={name}
        disabled={disabled}
      >
        <img src={`/images/cartes/${name}.jpg`} alt={name} draggable={false} />
      </button>
    </div>
  );
}

function CardDisplay({ name }: { name: CardName }) {
  return (
    <div className="card card-horizontal card-display">
      <img src={`/images/cartes/${name}.jpg`} alt={name} draggable={false} />
    </div>
  );
}

export function CardHand({
  currentPlayerCards,
  waitingPlayerCards,
  neutralCard,
  currentPlayer,
  selectedCard,
  onSelectCard,
  children,
}: CardHandProps) {
  const waitingPlayer = currentPlayer === 'blue' ? 'red' : 'blue';

  return (
    <>
      <div className="card-zone card-zone-waiting">
        <span className="card-label">Joueur {waitingPlayer === 'blue' ? 'Bleu' : 'Rouge'} en attente</span>
        <div className="cards-row cards-horizontal cards-flipped-vertical">
          <div className="card-wrapper">
            <CardDisplay name={waitingPlayerCards[0]} />
          </div>
          <div className="card-wrapper">
            <CardDisplay name={waitingPlayerCards[1]} />
          </div>
        </div>
      </div>

      {children}

      <div className="cards-below-board">
        <div className="card-zone card-zone-current">
          <span className="card-label">Vos cartes — Joueur {currentPlayer === 'blue' ? 'Bleu' : 'Rouge'}</span>
          <div className="cards-row cards-horizontal">
            <Card
              name={currentPlayerCards[0]}
              isSelected={selectedCard === currentPlayerCards[0]}
              onClick={() => onSelectCard(currentPlayerCards[0])}
            />
            <Card
              name={currentPlayerCards[1]}
              isSelected={selectedCard === currentPlayerCards[1]}
              onClick={() => onSelectCard(currentPlayerCards[1])}
            />
          </div>
        </div>

        <div className="card-zone card-zone-neutral">
          <span className="card-label">Prochaine carte</span>
          <div className="cards-row cards-horizontal">
            <CardDisplay name={neutralCard} />
          </div>
        </div>
      </div>
    </>
  );
}

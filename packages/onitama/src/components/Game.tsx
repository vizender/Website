import { useGame } from '../context/GameContext';
import { Board } from './Board';
import { CardHand } from './CardHand';
import { GameStatus } from './GameStatus';
import './Game.css';

export function Game() {
  const {
    board,
    blueCards,
    redCards,
    neutralCard,
    currentPlayer,
    selectedCard,
    selectedPiece,
    validMoves,
    winner,
    selectCard,
    resetGame,
    cellClick,
  } = useGame();

  const currentCards = currentPlayer === 'blue' ? blueCards : redCards;
  const waitingCards = currentPlayer === 'blue' ? redCards : blueCards;

  return (
    <div className="game">
      <GameStatus currentPlayer={currentPlayer} winner={winner} selectedCard={selectedCard} selectedPiece={selectedPiece} onReset={resetGame} />
      <CardHand
        currentPlayerCards={currentCards}
        waitingPlayerCards={waitingCards}
        neutralCard={neutralCard}
        currentPlayer={currentPlayer}
        selectedCard={selectedCard}
        onSelectCard={selectCard}
      >
        <div className={winner ? 'board-overlay' : ''}>
          <Board
            board={board}
            currentPlayer={currentPlayer}
            winner={winner}
            selectedPiece={selectedPiece}
            validMoves={validMoves}
            onCellClick={cellClick}
          />
        </div>
      </CardHand>
    </div>
  );
}

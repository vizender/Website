import { GameProvider } from './context/GameContext';
import { Game } from './components/Game';

export function Onitama() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

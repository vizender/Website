/**
 * Onitama movement cards.
 * Moves are relative: (dRow, dCol) from piece position.
 * Convention: "haut" sur la carte = dRow négatif (vers row 0).
 * Blue: forward = row 4, donc on utilise les moves tels quels.
 * Red: negate both (forward = row 0).
 */

export type Move = readonly [dRow: number, dCol: number];

export type CardName =
  | 'tiger'
  | 'dragon'
  | 'crab'
  | 'elephant'
  | 'monkey'
  | 'mantis'
  | 'crane'
  | 'boar'
  | 'frog'
  | 'rabbit'
  | 'goose'
  | 'rooster'
  | 'horse'
  | 'ox'
  | 'eel'
  | 'cobra';

export const CARD_MOVES: Record<CardName, readonly Move[]> = {
  tiger: [[-2, 0], [1, 0]],           // jump 2 forward (up), step 1 back
  dragon: [[-1, -2], [-1, 2], [1, -1], [1, 1]],   // 6, 10, 17, 19
  crab: [[0, -2], [0, 2], [-1, 0]],  // 1 forward (up)
  elephant: [[-1, -1], [-1, 1], [0, -1], [0, 1]], // 7, 9, 12, 14
  monkey: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
  mantis: [[-1, -1], [-1, 1], [1, 0]],
  crane: [[-1, 0], [1, -1], [1, 1]],
  boar: [[-1, 0], [0, -1], [0, 1]],
  frog: [[-1, -1], [0, -2], [1, 1]],              // 7, 11, 19
  rabbit: [[-1, 1], [0, 2], [1, -1]],             // 9, 15, 17
  goose: [[-1, -1], [0, -1], [0, 1], [1, 1]],     // 7, 12, 14, 19
  rooster: [[-1, 1], [0, -1], [0, 1], [1, -1]],   // 9, 12, 14, 17
  horse: [[-1, 0], [1, 0], [0, -1]],
  ox: [[-1, 0], [1, 0], [0, 1]],
  eel: [[-1, -1], [1, -1], [0, 1]],
  cobra: [[-1, 1], [1, 1], [0, -1]],
} as const;

export const ALL_CARD_NAMES: CardName[] = [
  'tiger', 'dragon', 'crab', 'elephant', 'monkey', 'mantis', 'crane', 'boar',
  'frog', 'rabbit', 'goose', 'rooster', 'horse', 'ox', 'eel', 'cobra',
];

export function getMovesForCard(cardName: CardName): readonly Move[] {
  return CARD_MOVES[cardName];
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function drawRandomCards(count: number): CardName[] {
  const shuffled = shuffleArray(ALL_CARD_NAMES);
  return shuffled.slice(0, count);
}

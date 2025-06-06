export type CardType = 'Character' | 'Implement' | 'Power';

export interface CardData {
  id: string;
  title: string;
  type: CardType;
  lp?: number;
  image?: string;
  attack1?: string;
  attack2?: string;
  attack1Cost?: number;
  attack2Cost?: number;
  rarity?: string;
  gemstone?: string;
  class?: string;
}

import * as path from 'path';
import * as fs from 'fs';

const dataPath = path.resolve(__dirname, '../../../cards_updated.json');

export function loadCards(): CardData[] {
  const content = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(content) as CardData[];
}

export const cards = loadCards();

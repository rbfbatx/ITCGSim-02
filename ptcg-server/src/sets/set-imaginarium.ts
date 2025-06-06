import * as path from 'path';
import * as fs from 'fs';
import { PokemonCard, TrainerCard, EnergyCard, Stage, CardType, EnergyType, TrainerType, Card } from '../game';

interface CardInfo {
  id?: string;
  cardNumber?: string;
  title: string;
  type: string;
  lp?: number;
  image?: string;
  attack1?: string;
  attack2?: string;
}

export class CharacterCard extends PokemonCard {
  constructor(data: CardInfo) {
    super();
    this.name = data.title;
    this.fullName = `${data.title} IMAG`;
    this.set = 'IMAG';
    this.setNumber = data.id || data.cardNumber || '';
    this.cardImage = data.image || 'assets/cardback.png';
    this.stage = Stage.BASIC;
    this.cardType = CardType.COLORLESS;
    this.hp = data.lp || 0;
    this.attacks = [];
    if (data.attack1) {
      this.attacks.push({ name: data.attack1, cost: [], damage: 0, text: data.attack1 });
    }
    if (data.attack2) {
      this.attacks.push({ name: data.attack2, cost: [], damage: 0, text: data.attack2 });
    }
  }
  reduceEffect() { return this; }
}

export class ImplementCard extends TrainerCard {
  constructor(data: CardInfo) {
    super();
    this.name = data.title;
    this.fullName = `${data.title} IMAG`;
    this.set = 'IMAG';
    this.setNumber = data.id || data.cardNumber || '';
    this.cardImage = data.image || 'assets/cardback.png';
    this.trainerType = TrainerType.IMPLEMENT;
    this.text = [data.attack1, data.attack2].filter(Boolean).join(' ');
  }
  reduceEffect(store: any, state: any, effect: any) { return state; }
}

export class PowerCard extends EnergyCard {
  constructor(data: CardInfo) {
    super();
    this.name = data.title;
    this.fullName = `${data.title} IMAG`;
    this.set = 'IMAG';
    this.setNumber = data.id || data.cardNumber || '';
    this.cardImage = data.image || 'assets/cardback.png';
    this.energyType = EnergyType.BASIC;
    this.provides = [CardType.COLORLESS];
  }
}

const dataPath = path.resolve(__dirname, '../../../../cards_updated.json');
const cardsData = JSON.parse(fs.readFileSync(dataPath, 'utf8')) as CardInfo[];

export const setImaginarium: Card[] = cardsData.map(info => {
  switch (info.type) {
    case 'Character':
      return new CharacterCard(info);
    case 'Implement':
      return new ImplementCard(info);
    case 'Power':
      return new PowerCard(info);
    default:
      return new CharacterCard(info);
  }
});

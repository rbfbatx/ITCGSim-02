import * as path from 'path';
import * as fs from 'fs';
import * as game from '../game';
import { Effect, State, StoreLike } from '../game';

class CharacterCard extends game.PokemonCard {
  public set: string = 'IMAG';
  public superType = game.SuperType.POKEMON;
  public format = game.Format.NONE;
  public fullName: string = '';
  public name: string = '';
  constructor(data: any) {
    super();
    this.name = data.title;
    this.fullName = `${data.title} IMAG`;
    this.set = 'IMAG';
    this.setNumber = data.id || data.cardNumber || '';
    this.cardImage = data.image || 'assets/cardback.png';
    this.stage = game.Stage.BASIC;
    this.cardType = game.CardType.COLORLESS;
    this.hp = data.lp || 0;
    this.attacks = [];
    if (data.attack1) {
      this.attacks.push({ name: data.attack1, cost: [], damage: 0, text: data.attack1 });
    }
    if (data.attack2) {
      this.attacks.push({ name: data.attack2, cost: [], damage: 0, text: data.attack2 });
    }
  }
  reduceEffect(store: StoreLike, state: State, effect: Effect) { return state; }
}

class ImplementCard extends game.TrainerCard {
  public set: string = 'IMAG';
  public superType = game.SuperType.TRAINER;
  public format = game.Format.NONE;
  public fullName: string = '';
  public name: string = '';
  constructor(data: any) {
    super();
    this.name = data.title;
    this.fullName = `${data.title} IMAG`;
    this.set = 'IMAG';
    this.setNumber = data.id || data.cardNumber || '';
    this.cardImage = data.image || 'assets/cardback.png';
    this.trainerType = game.TrainerType.IMPLEMENT;
    this.text = [data.attack1, data.attack2].filter(Boolean).join(' ');
  }
  reduceEffect(store: StoreLike, state: State, effect: Effect) { return state; }
}

class PowerCard extends game.EnergyCard {
  public set: string = 'IMAG';
  public superType = game.SuperType.ENERGY;
  public format = game.Format.NONE;
  public fullName: string = '';
  public name: string = '';
  constructor(data: any) {
    super();
    this.name = data.title;
    this.fullName = `${data.title} IMAG`;
    this.set = 'IMAG';
    this.setNumber = data.id || data.cardNumber || '';
    this.cardImage = data.image || 'assets/cardback.png';
    this.energyType = game.EnergyType.BASIC;
    this.provides = [game.CardType.COLORLESS];
  }
}

const dataPath = path.resolve(__dirname, '../../../cards_updated.json');
const cardsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

export const setImaginarium = cardsData.map((info: any) => {
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

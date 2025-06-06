'use strict';
const path = require('path');
const fs = require('fs');
const game = require('../../game');
class CharacterCard extends game.PokemonCard {
  constructor(data) {
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
  reduceEffect(store, state, effect) { return state; }
}
class ImplementCard extends game.TrainerCard {
  constructor(data) {
    super();
    this.name = data.title;
    this.fullName = `${data.title} IMAG`;
    this.set = 'IMAG';
    this.setNumber = data.id || data.cardNumber || '';
    this.cardImage = data.image || 'assets/cardback.png';
    this.trainerType = game.TrainerType.IMPLEMENT;
    this.text = [data.attack1, data.attack2].filter(Boolean).join(' ');
  }
  reduceEffect(store, state, effect) { return state; }
}
class PowerCard extends game.EnergyCard {
  constructor(data) {
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
const dataPath = path.resolve(__dirname, '../../../../cards_updated.json');
const cardsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const setImaginarium = cardsData.map(info => {
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
module.exports = { setImaginarium };

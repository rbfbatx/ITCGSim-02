import { CardData, cards } from './cards';
import { ImaginariumStatus, StatusMap } from './status';
import { rollDice, DiceResult } from './dice';

export interface PlayerState {
  id: string;
  deck: CardData[];
  hand: CardData[];
}

export interface GameState {
  players: PlayerState[];
  statuses: StatusMap;
}

export class ImaginariumGame {
  private state: GameState;

  constructor(playerIds: string[]) {
    this.state = {
      players: playerIds.map(id => ({ id, deck: [...cards], hand: [] })),
      statuses: {}
    };
  }

  drawCard(playerId: string): CardData | undefined {
    const player = this.state.players.find(p => p.id === playerId);
    if (!player || player.deck.length === 0) return undefined;
    const card = player.deck.shift();
    if (card) {
      player.hand.push(card);
    }
    return card;
  }

  applyStatus(targetId: string, status: ImaginariumStatus): void {
    if (!this.state.statuses[targetId]) {
      this.state.statuses[targetId] = [];
    }
    if (!this.state.statuses[targetId].includes(status)) {
      this.state.statuses[targetId].push(status);
    }
  }

  rollAttack(expression: string): DiceResult {
    return rollDice(expression);
  }

  getState(): GameState {
    return this.state;
  }
}

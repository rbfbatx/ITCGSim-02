import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Card {
  cardNumber: string;
  gemstone?: string;
  title: string;
  type: string;
  attack1?: string;
  attack2?: string;
  attack1Cost?: number;
  attack2Cost?: number;
  attack1damage?: string;
  attack2damage?: string;
  rarity: string;
  lp: number;
  image: string;
  effect?: string;
  class?: string;
}

export interface CardsResponse {
  success: boolean;
  cards: Card[];
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor(private http: HttpClient) {}

  public getCards(): Observable<CardsResponse> {
    return this.http.get<Card[]>('assets/cards.json').pipe(
      map(cards => ({ success: true, cards }))
    );
  }
}

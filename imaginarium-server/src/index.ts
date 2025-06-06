import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { cards } from './game/cards';
import { rollDice } from './game/dice';
import { ImaginariumGame } from './game/game';
import { GameState, Format } from './ptcg/types';

interface SocketResponse<T> {
  message: string;
  data?: T;
}

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const game = new ImaginariumGame(['p1', 'p2']);

const API_VERSION = 2;

app.get('/v1/login/info', (_req: Request, res: Response) => {
  res.json({ message: 'ok', config: { apiVersion: API_VERSION } });
});

app.post('/v1/login', (_req: Request, res: Response) => {
  res.json({ message: 'ok', token: 'dev-token', config: { apiVersion: API_VERSION } });
});

app.get('/v1/login/refreshToken', (_req: Request, res: Response) => {
  res.json({ message: 'ok', token: 'dev-token', config: { apiVersion: API_VERSION } });
});

app.post('/v1/login/register', (_req: Request, res: Response) => {
  res.json({ message: 'ok', token: 'dev-token', config: { apiVersion: API_VERSION } });
});

app.get('/v1/cards', (_req: Request, res: Response) => {
  res.json({ message: 'ok', cards });
});

app.post('/v1/game/roll', (req: Request, res: Response) => {
  const { expression } = req.body;
  try {
    const result = rollDice(expression);
    res.json({ message: 'ok', result });
  } catch (e: any) {
    res.json({ message: 'error', data: e.message });
  }
});

app.get('/v1/game/state', (_req: Request, res: Response) => {
  const gameState: GameState = {
    gameId: 1,
    stateData: game.getStateEncoded(),
    clientIds: [1, 2],
    timeLimit: 0,
    recordingEnabled: false,
    playerStats: [],
    format: Format.NONE,
  };
  res.json({ message: 'ok', gameState });
});

// Simple in-memory deck store
const decks: any[] = [];

app.get('/v1/decks/list', (_req: Request, res: Response) => {
  res.json({ message: 'ok', decks });
});

app.get('/v1/decks/get/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const deck = decks.find(d => d.id === id);
  res.json({ message: 'ok', deck });
});

app.post('/v1/decks/save', (req: Request, res: Response) => {
  const { id, name, cards } = req.body;
  let deck = decks.find(d => d.id === id);
  if (!deck) {
    deck = { id: decks.length + 1, name, cards };
    decks.push(deck);
  } else {
    deck.name = name;
    deck.cards = cards;
  }
  res.json({ message: 'ok', deck });
});

app.post('/v1/decks/delete', (req: Request, res: Response) => {
  const { id } = req.body;
  const index = decks.findIndex(d => d.id === id);
  if (index !== -1) {
    decks.splice(index, 1);
  }
  res.json({ message: 'ok' });
});

app.post('/v1/decks/rename', (req: Request, res: Response) => {
  const { id, name } = req.body;
  const deck = decks.find(d => d.id === id);
  if (deck) {
    deck.name = name;
  }
  res.json({ message: 'ok' });
});

app.post('/v1/decks/duplicate', (req: Request, res: Response) => {
  const { id, name } = req.body;
  const deck = decks.find(d => d.id === id);
  if (deck) {
    const newDeck = { id: decks.length + 1, name, cards: [...deck.cards] };
    decks.push(newDeck);
    res.json({ message: 'ok', deck: newDeck });
    return;
  }
  res.json({ message: 'error', data: 'Deck not found' });
});

io.on('connection', (socket) => {
  socket.on('joinLobby', (data: { format: string }, cb: (res: SocketResponse<any>) => void) => {
    cb({ message: 'ok', data: { format: data.format } });
  });

  socket.on('matchmaking:joinQueue', (_data: any, cb: (res: SocketResponse<any>) => void) => {
    cb({ message: 'ok' });
  });

  socket.on('matchmaking:leaveQueue', (_data: any, cb: (res: SocketResponse<any>) => void) => {
    cb({ message: 'ok' });
  });

  socket.on('checkQueueStatus', (_data: any, cb: (res: SocketResponse<any>) => void) => {
    cb({ message: 'ok', data: { players: [] } });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Imaginarium server running on port ${PORT}`);
});

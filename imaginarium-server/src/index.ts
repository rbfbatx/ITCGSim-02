import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

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

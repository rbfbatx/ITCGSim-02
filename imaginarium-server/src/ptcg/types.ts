export enum Format {
  NONE,
  STANDARD,
  EXPANDED,
  UNLIMITED,
  RETRO,
  GLC,
  STANDARD_NIGHTLY
}

export enum GamePhase {
  WAITING_FOR_PLAYERS,
  SETUP,
  PLAYER_TURN,
  ATTACK,
  AFTER_ATTACK,
  CHOOSE_PRIZES,
  BETWEEN_TURNS,
  FINISHED
}

export interface PlayerStats {
  clientId: number;
  isTimeRunning: boolean;
  timeLeft: number;
  invalidMoves: number;
}

export interface PlayerInfo {
  clientId: number;
  name: string;
  prizes: number;
  deck: number;
}

export interface GameInfo {
  gameId: number;
  phase: GamePhase;
  turn: number;
  activePlayer: number;
  players: PlayerInfo[];
}

export interface ClientInfo {
  clientId: number;
  userId: number;
}

export enum Rank {
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
  ULTRA = 'ULTRA',
  MASTER = 'MASTER',
  ADMIN = 'ADMIN',
  BANNED = 'BANNED',
  POKE = 'POKE',
  GREAT = 'GREAT'
}

export interface UserInfo {
  connected: boolean;
  userId: number;
  name: string;
  email: string;
  ranking: number;
  rank: Rank;
  registered: number;
  lastSeen: number;
  lastRankingChange: number;
  avatarFile: string;
}

export interface CoreInfo {
  clientId: number;
  clients: ClientInfo[];
  users: UserInfo[];
  games: GameInfo[];
}

export interface GameState {
  gameId: number;
  stateData: string;
  clientIds: number[];
  timeLimit: number;
  recordingEnabled: boolean;
  playerStats: PlayerStats[];
  format?: Format;
}

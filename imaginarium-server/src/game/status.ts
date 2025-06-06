export enum ImaginariumStatus {
  WOUNDED = 'WOUNDED',
  DISABLED = 'DISABLED'
}

export type StatusMap = Record<string, ImaginariumStatus[]>;

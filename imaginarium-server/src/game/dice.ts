export interface DiceResult {
  total: number;
  rolls: number[];
}

export function rollDice(expression: string): DiceResult {
  const match = expression.trim().match(/^(\d*)d(\d+)([+-]\d+)?$/i);
  if (!match) {
    throw new Error('Invalid dice expression');
  }
  const count = parseInt(match[1] || '1', 10);
  const sides = parseInt(match[2], 10);
  const modifier = match[3] ? parseInt(match[3], 10) : 0;
  let total = 0;
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    const value = 1 + Math.floor(Math.random() * sides);
    rolls.push(value);
    total += value;
  }
  total += modifier;
  return { total, rolls };
}

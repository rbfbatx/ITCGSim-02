export interface DiceResult {
  rolls: number[];
  total: number;
}

export function rollDice(notation: string): DiceResult {
  const match = notation.match(/(\d+)D(\d+)([+X])?/i);
  if (!match) {
    throw new Error(`Invalid dice notation: ${notation}`);
  }
  const count = parseInt(match[1], 10);
  const sides = parseInt(match[2], 10);
  const modifier = match[3];
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  let total = rolls.reduce((a, b) => a + b, 0);
  if (modifier === 'X') {
    total *= count;
  } else if (modifier === '+') {
    total += count;
  }
  return { rolls, total };
}

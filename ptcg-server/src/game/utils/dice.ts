export function rollDice(expression: string): number {
  const match = expression.trim().match(/^(\d*)d(\d+)([+-]\d+)?$/i);
  if (!match) {
    throw new Error('Invalid dice expression');
  }
  const count = parseInt(match[1] || '1', 10);
  const sides = parseInt(match[2], 10);
  const modifier = match[3] ? parseInt(match[3], 10) : 0;
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += 1 + Math.floor(Math.random() * sides);
  }
  return total + modifier;
}

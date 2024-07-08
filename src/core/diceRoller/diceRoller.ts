export const diceRoller = (input: string): number | null => {
  const rollRegex = /^(\/roll)\s(\d+)d(\d+)(([+-])(\d+))?$/;

  const match = rollRegex.exec(input);

  if (!match) return null;

  const numDice = Number(match[2] ?? 0);
  const dieValue = Number(match[3] ?? 0);
  const operator = match[5];
  const addition = Number(match[6] ?? 0);

  let value = 0;

  for(let x=0; x<numDice; x++) {
    const roll = 1 + Math.floor(Math.random() * dieValue);
    value += roll;
  }

  const toAdd = operator === '-'
  ? addition * -1
  : addition;

  value += toAdd;

  return value;
};

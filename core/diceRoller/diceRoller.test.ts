import { diceRoller } from './diceRoller';

describe('diceRoller', () => {
  it('should handle a /roll command', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.633333);

    const result = diceRoller('/roll 5d8+5');

    expect(result).toEqual(35);
  });

  it('should handle a /roll command with a minus', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.633333);

    const result = diceRoller('/roll 5d8-5');

    expect(result).toEqual(25);
  });

  it('should handle a /roll command with no addition', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.633333);

    const result = diceRoller('/roll 5d8');

    expect(result).toEqual(30);
  });

  it('should handle a malformed command', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.633333);

    const result = diceRoller('/roof 5d8-5');

    expect(result).toEqual(null);
  });

  it('should handle an absent command', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.633333);

    const result = diceRoller('');

    expect(result).toEqual(null);
  });
});
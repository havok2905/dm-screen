export class SpellNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Spell not found');
  }
}

export class SpellsNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Spells not found');
  }
}

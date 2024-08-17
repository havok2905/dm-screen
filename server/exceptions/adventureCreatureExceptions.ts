export class AdventureCreatureNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Adventure Creature not found');
  }
}

export class AdventureCreatureRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The AdventureCreature request body is not valid');
  }
}

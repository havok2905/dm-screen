export class AdventureCreatureNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Adventure Creature not found');
  }
}

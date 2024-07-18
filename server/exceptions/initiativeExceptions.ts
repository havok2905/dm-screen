export class InitiativeNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Initiative not found');
  }
}

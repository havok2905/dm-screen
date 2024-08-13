export class AdventureItemNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Adventure Item not found');
  }
}

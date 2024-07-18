export class MissingArgumentException extends Error {
  constructor(message?: string) {
    super(message ?? 'Missing argument exception');
  }
}

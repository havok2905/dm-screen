export class AdventureHandoutNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Adventure not found');
  }
}

export class AdventureHandoutRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The AdventureHandout request body is not valid');
  }
}

export class AdventureNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Adventure not found');
  }
}

export class AdventuresNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Adventures not found');
  }
}

export class AdventureRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The Adventure request body is not valid');
  }
}
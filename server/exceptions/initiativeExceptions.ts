export class InitiativeNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Initiative not found');
  }
}

export class InitiativeRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The Initiative request body is not valid');
  }
}

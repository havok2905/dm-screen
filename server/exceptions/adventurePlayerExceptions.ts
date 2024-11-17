export class AdventurePlayerNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Adventure Player not found');
  }
}

export class AdventurePlayerRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The AdventurePlayer request body is not valid');
  }
}

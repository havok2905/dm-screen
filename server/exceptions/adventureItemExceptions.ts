export class AdventureItemNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Adventure Item not found');
  }
}

export class AdventureItemRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The AdventureItem request body is not valid');
  }
}
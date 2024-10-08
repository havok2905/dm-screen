export class CreatureNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Creature not found');
  }
}

export class CreaturesNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Creatures not found');
  }
}

export class CreatureRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The Creature request body is not valid');
  }
}

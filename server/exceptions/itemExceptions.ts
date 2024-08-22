export class ItemsNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Items not found');
  }
}

export class EquipmentItemNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Equipment items not found');
  }
}

export class EquipmentItemRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The EquipmentItem request body is not valid');
  }
}

export class MagicItemNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Magic item not found');
  }
}

export class MagicItemRequestMalformedException extends Error {
  constructor(message?: string) {
    super(message ?? 'The Magic Item request body is not valid');
  }
}
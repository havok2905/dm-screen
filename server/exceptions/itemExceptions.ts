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

export class MagicItemNotFoundException extends Error {
  constructor(message?: string) {
    super(message ?? 'Magic item not found');
  }
}
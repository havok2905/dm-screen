import {
  AdventureItemNotFoundException,
  MissingArgumentException
} from '../exceptions';

import {
  AdventureItem
} from '../sequelize/db';

export class AdventureItemService {
  static async destroyAdventureItemById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const adventureItem = await AdventureItem.findOne({
      where: {
        id
      }
    });

    if (!adventureItem) {
      throw new AdventureItemNotFoundException();
    }

    adventureItem?.destroy();
    adventureItem?.save();
  
    return true;
  }
}

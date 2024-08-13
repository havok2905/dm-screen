import {
  AdventureCreatureNotFoundException,
  MissingArgumentException
} from '../exceptions';

import {
  AdventureCreature
} from '../sequelize/db';

export class AdventureCreatureService {
  static async destroyAdventureCreatureById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const adventureCreature = await AdventureCreature.findOne({
      where: {
        id
      }
    });

    if (!adventureCreature) {
      throw new AdventureCreatureNotFoundException();
    }

    adventureCreature?.destroy();
    adventureCreature?.save();
  
    return true;
  }
}

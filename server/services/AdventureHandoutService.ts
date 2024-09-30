import fs from 'fs';
import path from 'path';

import {
  AdventureHandoutNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { AdventureHandout } from '../sequelize/db';

export class AdventureHandoutService {
  static async destroyAdventureHandoutById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const adventureHandout = await AdventureHandout.findOne({
      where: {
        id
      }
    });

    if (!adventureHandout) {
      throw new AdventureHandoutNotFoundException();
    }

    const url = adventureHandout.dataValues.url;
    const imagePath = path.join(path.resolve(__dirname), '..', '..', url);

    adventureHandout?.destroy();
    adventureHandout?.save();
 
    fs.unlinkSync(imagePath);
    
    return true;
  }
}

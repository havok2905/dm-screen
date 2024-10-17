import {
  AdventureCreatureNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { AdventureCreature } from '../sequelize/db';
import { AdventureCreatureResponse } from '../responses';
import { deleteImageFromDiskIfItExists } from './utils/deleteImageFromDiskIfItExists';
import { UpdateAdventureCreatureRequest } from '../requests';


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

    deleteImageFromDiskIfItExists(adventureCreature.dataValues.image);

    adventureCreature?.destroy();
    adventureCreature?.save();
  
    return true;
  }

  static async getAdventureCreatureById(id: string): Promise<AdventureCreatureResponse> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const adventureCreature = await AdventureCreature.findOne({
      where: {
        id: id
      }
    });

    if (!adventureCreature) {
      throw new AdventureCreatureNotFoundException();
    }

    return this.mapResponseJson(
      adventureCreature
    );
  }

  static async updateAdventureCreatureById(id: string, updateAdventureCreatureRequest: UpdateAdventureCreatureRequest): Promise<AdventureCreatureResponse> {
    if (!id || !updateAdventureCreatureRequest) {
      throw new MissingArgumentException();
    }

    updateAdventureCreatureRequest.validate();

    const adventureCreature = await AdventureCreature.findOne({
      where: {
        id: id
      }
    });

    if (!adventureCreature) {
      throw new AdventureCreatureNotFoundException();
    }

    await adventureCreature.update({
      adventureid: updateAdventureCreatureRequest.adventureid,
      content: updateAdventureCreatureRequest.content,
      image: updateAdventureCreatureRequest.image,
      metadata: JSON.stringify(updateAdventureCreatureRequest.metadata),
      name: updateAdventureCreatureRequest.name
    });

    return this.mapResponseJson(adventureCreature);
  }

  private static mapResponseJson (
    adventureCreature
  ): AdventureCreatureResponse {
    return {
      ...adventureCreature.dataValues,
      metadata: JSON.parse(adventureCreature.dataValues.metadata)
    };
  }
}

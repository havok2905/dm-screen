import {
  AdventureItemNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { AdventureItem } from '../sequelize/db';
import { AdventureItemResponse } from '../responses';
import { UpdateAdventureItemRequest } from '../requests';

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

  static async getAdventureItemById(id: string): Promise<AdventureItemResponse> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const adventureItem = await AdventureItem.findOne({
      where: {
        id: id
      }
    });

    if (!adventureItem) {
      throw new AdventureItemNotFoundException();
    }

    return this.mapResponseJson(
      adventureItem
    );
  }

  static async updateAdventureItemById(id: string, updateAdventureItemRequest: UpdateAdventureItemRequest): Promise<AdventureItemResponse> {
    if (!id || !updateAdventureItemRequest) {
      throw new MissingArgumentException();
    }

    updateAdventureItemRequest.validate();

    const adventureItem = await AdventureItem.findOne({
      where: {
        id: id
      }
    });

    if (!adventureItem) {
      throw new AdventureItemNotFoundException();
    }

    await adventureItem.update({
      adventureid: updateAdventureItemRequest.adventureid,
      content: updateAdventureItemRequest.content,
      image: updateAdventureItemRequest.image,
      metadata: JSON.stringify(updateAdventureItemRequest.metadata),
      name: updateAdventureItemRequest.name
    });

    return this.mapResponseJson(adventureItem);
  }

  private static mapResponseJson (
    adventureItem
  ): AdventureItemResponse {
    return {
      ...adventureItem.dataValues,
      metadata: JSON.parse(adventureItem.dataValues.metadata)
    };
  }
}

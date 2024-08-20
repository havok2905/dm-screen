import {
  EquipmentItem,
  MagicItem
} from '../sequelize/db';

import { ItemResponse } from '../responses';
import { ItemsNotFoundException } from '../exceptions';

export class ItemService {
  static async getEquipmentItems(): Promise<ItemResponse[]> {
    const equipmentItems = await EquipmentItem.findAll();

    if (!equipmentItems.length) {
      throw new ItemsNotFoundException();    
    }

    return this.mapItemsResponseJson(equipmentItems);
  }

  static async getMagicItems(): Promise<ItemResponse[]> {
    const magicItems = await MagicItem.findAll();

    if (!magicItems.length) {
      throw new ItemsNotFoundException();    
    }

    return this.mapItemsResponseJson(magicItems);
  }

  private static mapItemsResponseJson (
    items
  ): ItemResponse[] {
    return items.map(item => {
      return {
        ...item.dataValues,
        metadata: JSON.parse(item.dataValues.metadata)
      };
    });
  }
}
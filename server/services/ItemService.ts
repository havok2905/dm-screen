import {
  EquipmentItem,
  MagicItem
} from '../sequelize/db';
import {
  EquipmentItemNotFoundException,
  ItemsNotFoundException,
  MagicItemNotFoundException,
  MissingArgumentException
} from '../exceptions';

import { ItemResponse } from '../responses';

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

  static async getEquipmentItemById(id: string): Promise<ItemResponse> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const item = await EquipmentItem.findOne({
      where: {
        id: id
      }
    });

    if (!item) {
      throw new EquipmentItemNotFoundException();
    }

    return this.mapItemResponseJson(
      item
    );
  }

  static async getMagicItemById(id: string): Promise<ItemResponse> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const item = await MagicItem.findOne({
      where: {
        id: id
      }
    });

    if (!item) {
      throw new MagicItemNotFoundException();
    }

    return this.mapItemResponseJson(
      item
    );
  }

  private static mapItemResponseJson (
    item
  ): ItemResponse {
    return {
      ...item.dataValues,
      metadata: JSON.parse(item.dataValues.metadata)
    };
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
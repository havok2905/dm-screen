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
import {
  UpdateEquipmentItemRequest,
  UpdateMagicItemRequest
} from '../requests';

import { ItemResponse } from '../responses';

export class ItemService {
  static async destroyEquipmentItemById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const item = await EquipmentItem.findOne({
      where: {
        id
      }
    });

    if (!item) {
      throw new EquipmentItemNotFoundException();
    }

    item?.destroy();
    item?.save();
  
    return true;
  }

  static async destroyMagicItemById(id: string): Promise<boolean> {
    if (!id) {
      throw new MissingArgumentException();
    }

    const item = await MagicItem.findOne({
      where: {
        id
      }
    });

    if (!item) {
      throw new MagicItemNotFoundException();
    }

    item?.destroy();
    item?.save();
  
    return true;
  }

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

  static async updateEquipmentItemById(id: string, updateEquipmentItemRequest: UpdateEquipmentItemRequest): Promise<ItemResponse> {
    if (!id || !updateEquipmentItemRequest) {
      throw new MissingArgumentException();
    }

    updateEquipmentItemRequest.validate();

    const item = await EquipmentItem.findOne({
      where: {
        id: id
      }
    });

    if (!item) {
      throw new EquipmentItemNotFoundException();
    }

    await item.update({
      content: updateEquipmentItemRequest.content,
      image: updateEquipmentItemRequest.image,
      metadata: JSON.stringify(updateEquipmentItemRequest.metadata),
      name: updateEquipmentItemRequest.name
    });

    return this.mapItemResponseJson(item);
  }

  static async updateMagicItemById(id: string, updateMagicItemRequest: UpdateMagicItemRequest): Promise<ItemResponse> {
    if (!id || !updateMagicItemRequest) {
      throw new MissingArgumentException();
    }

    updateMagicItemRequest.validate();

    const item = await MagicItem.findOne({
      where: {
        id: id
      }
    });

    if (!item) {
      throw new MagicItemNotFoundException();
    }

    await item.update({
      content: updateMagicItemRequest.content,
      image: updateMagicItemRequest.image,
      metadata: JSON.stringify(updateMagicItemRequest.metadata),
      name: updateMagicItemRequest.name
    });

    return this.mapItemResponseJson(item);
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
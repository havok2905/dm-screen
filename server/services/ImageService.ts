import fs from 'fs';
import path from 'path';

import {
  AddImageRequest,
  RemoveImageRequest
} from '../requests';
import {
  Creature,
  EquipmentItem,
  MagicItem,
  Spell
} from '../sequelize/db';
import {
  ImageResourceNotFoundException,
  MissingArgumentException
} from '../exceptions';

export class ImageService {
  static async addImage(
    addImageRequest: AddImageRequest
  ): Promise<boolean> {
    if (!addImageRequest) {
      throw new MissingArgumentException();
    }

    addImageRequest.validate();

    const entityId = addImageRequest.entityId;
    const entityType = addImageRequest.entityType;
    const url = addImageRequest.url;

    const entity = await ImageService.getEntity(entityId, entityType);

    if (!entity) {
      throw new ImageResourceNotFoundException();
    }

    ImageService.deleteImageFromDiskIfItExists(entity.image);

    entity.image = url;
    entity.save();

    return true;
  }

  static async removeImage(
    removeImageRequest: RemoveImageRequest
  ): Promise<boolean> {
    if (!removeImageRequest) {
      throw new MissingArgumentException();
    }

    removeImageRequest.validate();

    const entityId = removeImageRequest.entityId;
    const entityType = removeImageRequest.entityType;

    const entity = await ImageService.getEntity(entityId, entityType);

    if (!entity) {
      throw new ImageResourceNotFoundException();
    }

    ImageService.deleteImageFromDiskIfItExists(entity.image);

    entity.image = '';
    entity.save();

    return true;
  }

  static deleteImageFromDiskIfItExists(imagePath: string) {
    if (imagePath) {
      const fullImagePath = path.join(path.resolve(__dirname), '..', '..', imagePath);

      if (fs.existsSync(fullImagePath)) {
        fs.unlinkSync(fullImagePath);
      }
    }
  }

  static async getEntity(
    entityId: string,
    entityType: 'creature' | 'equipment-item' | 'magic-item' | 'spell'
  ): Promise<any | null> {
    switch(entityType) {
      case 'creature':
        return await Creature.findOne({
          where: {
            id: entityId
          }
        });
        break;
      case 'equipment-item':
        return await EquipmentItem.findOne({
          where: {
            id: entityId
          }
        });
        break;
      case 'magic-item':
        return await MagicItem.findOne({
          where: {
            id: entityId
          }
        });
        break;
      case 'spell':
        return await Spell.findOne({
          where: {
            id: entityId
          }
        });
      default:
        return null;
    }
  }
}
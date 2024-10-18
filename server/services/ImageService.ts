import { deleteImageFromDiskIfItExists } from './utils/deleteImageFromDiskIfItExists';

import {
  AddImageRequest,
  RemoveImageRequest
} from '../requests';
import {
  Adventure,
  Creature,
  EquipmentItem,
  MagicItem,
  Spell
} from '../sequelize/db';
import {
  ImageResourceNotFoundException,
  MissingArgumentException
} from '../exceptions';

type EntityType =
  'adventure-splash-image' |
  'creature' |
  'magic-item' |
  'equipment-item' |
  'spell';

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

    if (entityType === 'adventure-splash-image') {
      deleteImageFromDiskIfItExists(entity.splashImgSrc);
      entity.splashImgSrc = url;
    } else {
      deleteImageFromDiskIfItExists(entity.image);
      entity.image = url;
    }

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

    if (entityType === 'adventure-splash-image') {
      deleteImageFromDiskIfItExists(entity.splashImgSrc);
      entity.splashImgSrc = '';
    } else {
      deleteImageFromDiskIfItExists(entity.image);
      entity.image = '';
    }

    entity.image = '';
    entity.save();

    return true;
  }

  static async getEntity(
    entityId: string,
    entityType: EntityType
  ): Promise<any | null> {
    switch(entityType) {
      case 'adventure-splash-image':
        return await Adventure.findOne({
          where: {
            id: entityId
          }
        });
      case 'creature':
        return await Creature.findOne({
          where: {
            id: entityId
          }
        });
      case 'equipment-item':
        return await EquipmentItem.findOne({
          where: {
            id: entityId
          }
        });
      case 'magic-item':
        return await MagicItem.findOne({
          where: {
            id: entityId
          }
        });
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
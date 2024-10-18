import { ImageRequestMalformedException } from '../exceptions';
import { Request } from './Request';

type EntityType =
  'adventure-splash-image' |
  'creature' |
  'magic-item' |
  'equipment-item' |
  'spell';

export class RemoveImageRequest implements Request {
  public entityId: string;
  public entityType: EntityType;

  constructor(
    entityId: string,
    entityType: EntityType,
  ) {
    this.entityId = entityId;
    this.entityType = entityType;
  }

  validate() {
    if (
      this.entityType !== 'adventure-splash-image' &&
      this.entityType !== 'creature' &&
      this.entityType !== 'equipment-item' &&
      this.entityType !== 'magic-item' &&
      this.entityType !== 'spell'
    ) {
      throw new ImageRequestMalformedException();
    }

    if (
      !this.entityId ||
      !this.entityType
    ) {
      throw new ImageRequestMalformedException();
    }
  }
}
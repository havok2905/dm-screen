import { ImageRequestMalformedException } from '../exceptions';
import { Request } from './Request';

type EntityType =
  'adventure-splash-image' |
  'creature' |
  'magic-item' |
  'equipment-item' |
  'spell';

export class AddImageRequest implements Request {
  public entityId: string;
  public entityType: EntityType;
  public url: string;

  constructor(
    entityId: string,
    entityType: EntityType,
    url: string
  ) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.url = url;
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
      !this.entityType ||
      !this.url
    ) {
      throw new ImageRequestMalformedException();
    }
  }
}
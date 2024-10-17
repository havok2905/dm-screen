import { ImageRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export class AddImageRequest implements Request {
  public entityId: string;
  public entityType: 'creature' | 'equipment-item' | 'magic-item' | 'spell';
  public url: string;

  constructor(
    entityId: string,
    entityType: 'creature' | 'equipment-item' | 'magic-item' | 'spell',
    url: string
  ) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.url = url;
  }

  validate() {
    if (
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
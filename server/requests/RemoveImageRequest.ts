import { ImageRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export class RemoveImageRequest implements Request {
  public entityId: string;
  public entityType: 'creature' | 'equipment-item' | 'magic-item' | 'spell';

  constructor(
    entityId: string,
    entityType: 'creature' | 'equipment-item' | 'magic-item' | 'spell',
  ) {
    this.entityId = entityId;
    this.entityType = entityType;
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
      !this.entityType
    ) {
      throw new ImageRequestMalformedException();
    }
  }
}
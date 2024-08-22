import { Request } from './Request';
import { SpellRequestMalformedException } from '../exceptions';

export class UpdateSpellRequest implements Request {
  public content: string;
  public id: string;
  public image: string;
  public metadata: {
    name: string;
    type: 'string' | 'number';
    value: string | number;
  }[];
  public name: string;

  constructor(
    content: string,
    id: string,
    image: string,
    metadata: {
      name: string;
      type: 'string' | 'number';
      value: string | number;
    }[],
    name: string
  ) {
    this.content = content;
    this.id = id;
    this.image = image;
    this.metadata = metadata;
    this.name = name;
  }

  validate() {
    if (
      !this.id ||
      !this.name
    ) {
      throw new SpellRequestMalformedException();
    }
  }
}
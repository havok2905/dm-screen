import { AdventureCreatureRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export class UpdateAdventureCreatureRequest implements Request {
  public adventureid: string;
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
    adventureid: string,
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
    this.adventureid = adventureid;
    this.content = content;
    this.id = id;
    this.image = image;
    this.metadata = metadata;
    this.name = name;
  }

  validate() {
    if (
      !this.adventureid ||
      !this.id ||
      !this.name
    ) {
      throw new AdventureCreatureRequestMalformedException();
    }
  }
}
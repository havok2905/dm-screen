import { AdventureItemRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export interface MetaData {
  name: string;
  type: 'string' | 'number';
  value: string | number;
}

export class UpdateAdventureItemRequest implements Request {
  public adventureid: string;
  public content: string;
  public id: string;
  public image: string;
  public metadata: MetaData[];
  public name: string;

  constructor(
    adventureid: string,
    content: string,
    id: string,
    image: string,
    metadata: MetaData[],
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
      throw new AdventureItemRequestMalformedException();
    }
  }
}
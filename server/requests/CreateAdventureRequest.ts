import { AdventureRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export class CreateAdventureRequest implements Request {
  public description: string;
  public id: string;
  public name: string;
  public system: string;

  constructor(
    description: string,
    id: string,
    name: string,
    system: string
  ) {
    this.description = description;
    this.id = id;
    this.name = name;
    this.system = system;
  }

  validate() {
    if (
      !this.description ||
      !this.id ||
      !this.name ||
      !this.system
    ) {
      throw new AdventureRequestMalformedException();
    }
  }
}
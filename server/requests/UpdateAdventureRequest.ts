import { AdventureRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export class UpdateAdventureRequest implements Request {
  public description: string;
  public name: string;
  public notes: string;
  public system: string;

  constructor(
    description: string,
    name: string,
    notes: string,
    system: string
  ) {
    this.description = description;
    this.name = name;
    this.notes = notes;
    this.system = system;
  }

  validate() {
    if (
      !this.description ||
      !this.name ||
      !this.notes ||
      !this.system
    ) {
      throw new AdventureRequestMalformedException();
    }
  }
}
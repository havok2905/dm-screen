import { AdventureHandoutRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export class AddAdventureHandoutRequest implements Request {
  public adventureid: string;
  public description: string;
  public name: string;
  public url: string;

  constructor(
    adventureid: string,
    name: string,
    description: string,
    url: string
  ) {
    this.adventureid = adventureid;
    this.description = description;
    this.name = name;
    this.url = url;
  }

  validate() {
    if (
      !this.adventureid ||
      !this.description ||
      !this.name ||
      !this.url
    ) {
      throw new AdventureHandoutRequestMalformedException();
    }
  }
}
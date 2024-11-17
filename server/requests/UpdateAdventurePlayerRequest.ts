import { AdventurePlayerRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export class UpdateAdventurePlayerRequest implements Request {
  public ac: number;
  public adventureid: string;
  public charactername: string;
  public id: string;
  public image: string;
  public playername: string;

  constructor(
    ac: number,
    adventureid: string,
    charactername: string,
    id: string,
    image: string,
    playername: string
  ) {
    this.ac = ac;
    this.adventureid = adventureid;
    this.charactername = charactername;
    this.id = id;
    this.image = image;
    this.playername = playername;
  }

  validate() {
    if (
      (
        this.ac === null ||
        typeof this.ac === 'undefined'
      ) ||
      !this.adventureid ||
      !this.charactername ||
      !this.id ||
      !this.playername
    ) {
      throw new AdventurePlayerRequestMalformedException();
    }
  }
}
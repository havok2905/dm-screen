import { InitiativeRequestMalformedException } from '../exceptions';
import { Request } from './Request';

export class UpdateInitiativeRequest implements Request {
  public initiativeOrderState: unknown;
  
  constructor(initiativeOrderState: string) {
    this.initiativeOrderState = initiativeOrderState;
  }
  
  validate() {
    if (
      this.initiativeOrderState === '' ||
      typeof this.initiativeOrderState !== 'string'
    ) {
      throw new InitiativeRequestMalformedException();
    }

    try {
      JSON.parse(this.initiativeOrderState)
    } catch {
      throw new InitiativeRequestMalformedException();
    }
  }
}

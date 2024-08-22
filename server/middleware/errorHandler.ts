import {
  NextFunction,
  Request,
  Response
} from 'express';

import {
  AdventureCreatureNotFoundException,
  AdventureCreatureRequestMalformedException,
  AdventureItemNotFoundException,
  AdventureItemRequestMalformedException,
  AdventureNotFoundException,
  AdventureRequestMalformedException,
  AdventuresNotFoundException,
  CreatureNotFoundException,
  CreatureRequestMalformedException,
  CreaturesNotFoundException,
  EquipmentItemNotFoundException,
  EquipmentItemRequestMalformedException,
  InitiativeNotFoundException,
  ItemsNotFoundException,
  MagicItemNotFoundException,
  MagicItemRequestMalformedException,
  MissingArgumentException,
  SpellNotFoundException,
  SpellRequestMalformedException,
  SpellsNotFoundException,
} from '../exceptions';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    error instanceof MissingArgumentException ||
    error instanceof AdventureItemRequestMalformedException ||
    error instanceof AdventureRequestMalformedException ||
    error instanceof AdventureCreatureRequestMalformedException ||
    error instanceof CreatureRequestMalformedException ||
    error instanceof EquipmentItemRequestMalformedException ||
    error instanceof MagicItemRequestMalformedException ||
    error instanceof SpellRequestMalformedException
  ) {
    response.status(400).send();  
  } else if (
    error instanceof AdventureNotFoundException ||
    error instanceof AdventuresNotFoundException ||
    error instanceof AdventureCreatureNotFoundException ||
    error instanceof AdventureItemNotFoundException ||
    error instanceof CreatureNotFoundException ||
    error instanceof CreaturesNotFoundException ||
    error instanceof EquipmentItemNotFoundException ||
    error instanceof InitiativeNotFoundException ||
    error instanceof ItemsNotFoundException ||
    error instanceof MagicItemNotFoundException ||
    error instanceof SpellNotFoundException ||
    error instanceof SpellsNotFoundException
  ) {
    response.status(404).send();
  }

  next();
};

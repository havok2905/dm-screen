import {
  NextFunction,
  Request,
  Response
} from 'express';

import {
  AdventureCreatureNotFoundException,
  AdventureCreatureRequestMalformedException,
  AdventureHandoutRequestMalformedException,
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
  ImageRequestMalformedException,
  ImageResourceNotFoundException,
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
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    error instanceof MissingArgumentException ||
    error instanceof AdventureItemRequestMalformedException ||
    error instanceof AdventureHandoutRequestMalformedException ||
    error instanceof AdventureRequestMalformedException ||
    error instanceof AdventureCreatureRequestMalformedException ||
    error instanceof CreatureRequestMalformedException ||
    error instanceof EquipmentItemRequestMalformedException ||
    error instanceof ImageRequestMalformedException ||
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
    error instanceof ImageResourceNotFoundException ||
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

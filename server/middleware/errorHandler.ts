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
  EquipmentItemNotFoundException,
  InitiativeNotFoundException,
  ItemsNotFoundException,
  MagicItemNotFoundException,
  MissingArgumentException,
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
    error instanceof AdventureCreatureRequestMalformedException
  ) {
    response.status(400).send();  
  } else if (
    error instanceof AdventureNotFoundException ||
    error instanceof AdventuresNotFoundException ||
    error instanceof AdventureCreatureNotFoundException ||
    error instanceof AdventureItemNotFoundException ||
    error instanceof EquipmentItemNotFoundException ||
    error instanceof InitiativeNotFoundException ||
    error instanceof ItemsNotFoundException ||
    error instanceof MagicItemNotFoundException
  ) {
    response.status(404).send();
  }

  next();
};

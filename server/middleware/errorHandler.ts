import {
  NextFunction,
  Request,
  Response
} from 'express';

import {
  AdventureNotFoundException,
  AdventureCreatureNotFoundException,
  AdventureItemNotFoundException,
  AdventureRequestMalformedException,
  AdventuresNotFoundException,
  InitiativeNotFoundException,
  MissingArgumentException
} from '../exceptions';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    error instanceof MissingArgumentException ||
    error instanceof AdventureRequestMalformedException
  ) {
    response.status(400).send();  
  } else if (
    error instanceof AdventureNotFoundException ||
    error instanceof AdventuresNotFoundException ||
    error instanceof AdventureCreatureNotFoundException ||
    error instanceof AdventureItemNotFoundException ||
    error instanceof InitiativeNotFoundException
  ) {
    response.status(404).send();
  }

  next();
};

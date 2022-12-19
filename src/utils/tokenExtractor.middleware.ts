import { Request, Response, NextFunction } from 'express';

export const tokenExtractor = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.get('authorization');
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.body.token = authorization.substring(7);
  } else req.body.token = null;

  console.log('Request received!');
  next();
};

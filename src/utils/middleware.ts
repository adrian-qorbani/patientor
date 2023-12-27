import { Request } from 'express';

// token get middleware
export const getTokenFrom = (request: Request): string | null => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};


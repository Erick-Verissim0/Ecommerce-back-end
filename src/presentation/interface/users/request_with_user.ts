import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    name: string;
    email: string;
    type: string;
  };
}

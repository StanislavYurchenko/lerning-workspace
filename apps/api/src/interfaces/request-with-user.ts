import { Request } from 'express';
import { User } from '@learning-workspace/api-interfaces';

export interface RequestWithUser extends Request {
  user: User;
}

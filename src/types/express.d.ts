import type { decodedToken } from '../middlewares/authMiddleware.ts';
import type { Iuser } from '../models/userModal.ts';

declare global {
  namespace Express {
    interface Request {
      user?: Iuser | decodedToken;
    }
  }
}

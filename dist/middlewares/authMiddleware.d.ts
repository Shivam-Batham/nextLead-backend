import type { NextFunction, Request, Response } from 'express';
import { type JwtPayload } from 'jsonwebtoken';
import type { Types } from 'mongoose';
export interface DecodedToken extends JwtPayload {
    _id: Types.ObjectId;
    name: string;
    email: string;
}
export declare function authMiddle(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
//# sourceMappingURL=authMiddleware.d.ts.map
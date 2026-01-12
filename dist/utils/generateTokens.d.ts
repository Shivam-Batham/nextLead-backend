import type { Types, Model as MongooseModel } from 'mongoose';
import type { NextFunction } from 'express';
import type { IUserDocument } from '../models/userModal.ts';
type Tokens = {
    accessToken: string | null;
    refreshToken: string | null;
};
type GenerateTokensModel = MongooseModel<IUserDocument> & {
    findById(id: Types.ObjectId): Promise<IUserDocument | null>;
};
export declare function generateTokens(id: Types.ObjectId, Model: GenerateTokensModel, next: NextFunction): Promise<Tokens>;
export {};
//# sourceMappingURL=generateTokens.d.ts.map
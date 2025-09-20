import type { Types } from 'mongoose';
import type { NextFunction } from 'express';

type tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};
export async function generateTokens(id: Types.ObjectId, Model: any, next: NextFunction): Promise<tokens> {
  try {
    const user = await Model.findById({ _id: id });
    if (!user) {
      return { accessToken: null, refreshToken: null };
    }
    const accessToken: string = user.generateAccessToken();
    const refreshToken: string = user.generateRefreshToken();

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    next(error);
    return { accessToken: null, refreshToken: null };
  }
}

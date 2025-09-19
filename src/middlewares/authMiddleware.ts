import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload, type Secret } from 'jsonwebtoken';
import User from '../models/userModal.ts';
import type { Types } from 'mongoose';

export interface decodedToken extends JwtPayload {
  _id: Types.ObjectId;
  name: string;
  email: string;
}

export async function authMiddle(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized request.',
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret) as decodedToken;

    const user = await User.findById(decodedToken._id).select('-password -refreshToken');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found.',
      });
    }
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

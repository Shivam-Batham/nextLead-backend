import type { NextFunction, Request, Response } from 'express';
import User from '../models/userModal.ts';
import type { Types } from 'mongoose';

type tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};
export async function generateTokens(id: Types.ObjectId, next: NextFunction): Promise<tokens> {
  try {
    const user = await User.findById({ _id: id });
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

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: 'All field are required.',
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const isPasswordCorrect = await user?.isPasswordCorrect?.(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Credential incorrect.',
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user._id, next);

    // set in headers
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.setHeader('Refresh-Token', `${refreshToken}`);

    // find loggedIn User && set cookie
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie('accessToken', accessToken, options).cookie('refreshToken', refreshToken, options).json({
      success: true,
      message: 'User logged in successfull.',
      user: loggedInUser,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findByIdAndUpdate(
      req?.user?._id,
      {
        $set: { refreshToken: null, accessToken: null },
      },
      { new: true },
    ).select('-password -accessToken -refreshToken');

    const options = {
      httpOnly: true,
      secure: true,
    };

    if (!user) {
      return res.status(200).clearCookie('accessToken', options).clearCookie('refreshToken', options).json({
        success: true,
        data: user,
        message: 'User logout succesfull.',
      });
    }

    return res.status(200).clearCookie('accessToken', options).clearCookie('refreshToken', options).json({
      success: true,
      data: user,
      message: 'User logout succesfull.',
    });
  } catch (error) {
    next(error);
  }
}

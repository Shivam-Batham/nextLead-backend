import type { NextFunction, Request, Response } from 'express';
import User from '../models/userModal.ts';
import { generateTokens } from '../utils/generateTokens.ts';
import Hr from '../models/hrModel.ts';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: 'All field are required.',
      });
    }

    // Findout the owner account in User or Hr using email.
    let account = await User.findOne({ email: email });

    if (!account) {
      account = await Hr.findOne({ email: email });
    }

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const isPasswordCorrect = await account.isPasswordCorrect?.(password);
    console.log(isPasswordCorrect,password,account.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Credential incorrect.',
      });
    }

    const { accessToken, refreshToken } = await generateTokens(account._id, User, next);

    // set in headers
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.setHeader('Refresh-Token', `${refreshToken}`);

    // find loggedIn User && set cookie
    const loggedInUser = await User.findById(account._id).select('-password -refreshToken');

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
    let accountId: any = req?.user?._id;

    if (!accountId) {
      return res.status(400).json({
        success: false,
        message: 'Id is required.',
      });
    }

    let Model: any = User;

    accountId = await User.findById(accountId);

    if (!accountId) {
      accountId = await Hr.findById(accountId);
      Model = Hr;
    }

    if (!accountId) {
      return res.status(404).json({
        success: false,
        message: 'Account not found.',
      });
    }

    const data = await Model.findByIdAndUpdate(
      accountId,
      {
        $set: { refreshToken: null, accessToken: null },
      },
      { new: true },
    ).select('-password -accessToken -refreshToken');

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).clearCookie('accessToken', options).clearCookie('refreshToken', options).json({
      success: true,
      data: data,
      message: 'User logout succesfull.',
    });
  } catch (error) {
    next(error);
  }
}

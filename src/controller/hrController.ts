import type { NextFunction, Request, Response } from 'express';
import Hr, { type Ihr } from '../models/hrModel.ts';

export async function createHr(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password,contact } = req.body;
    if (!(name && email && password && contact)) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }
    // check for existing User
    const existingUser = await Hr.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists.',
      });
    }

    // create new user
    let hr = new Hr<Ihr>({ name: name, email: email, password: password, contact: contact });
    hr = await hr.save();
    // remove password from the user
    const { password: _, ...userWithoutPassword } = hr.toObject();  

    return res.status(201).json({
      success: true,
      message: 'User is created successfully.',
      data: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updateHr(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, location, contact, company, city, state, country } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Id is required.',
      });
    }
    const existingUser = await Hr.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'Hr not found',
      });
    }
    const updatedUser = await Hr.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        contact: contact,
        location: location,
        company: company,
        city: city,
        state: state,
        country: country,
      },
      { new: true },
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Hr updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getHr(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Id is required.',
      });
    }

    const user = await Hr.findById({ _id: id }).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
        data: user,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User found.',
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteHr(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'UserId is required.',
      });
    }

    const existingUser = await Hr.findOne({ _id: id });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found.',
      });
    }

    const deletedUser = await Hr.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: 'User is deleted succesdfully.',
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getAllHr(req: Request, res: Response, next: NextFunction) {
  try {
    const hr = await Hr.find();
    return res.status(200).json({
      success: true,
      message: 'Hr found.',
      data: hr,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
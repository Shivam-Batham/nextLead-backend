import type { Request, Response, NextFunction } from 'express';
import User, { type Iuser } from '../models/userModal.ts';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }
    // check for existing User
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists.',
      });
    }

    // create new user
    let user = new User<Iuser>({ name: name, email: email, password: password });
    user = await user.save();
    // remove password from the user
    const { password: _, ...userWithoutPassword } = user.toObject();

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

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, contact, resumeLink, projects, domain } = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Id is required.',
      });
    }
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        contact: contact,
        resumeLink: resumeLink,
        projects: projects,
        domain: domain,
      },
      { new: true },
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id  = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Id is required.',
      });
    }
    const user = await User.findById({_id:id});
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

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id  = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'UserId is required.',
      });
    }

    const existingUser = await User.findOne({ _id: id });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found.',
      });
    }

    const deletedUser = await User.deleteOne({ _id: id });
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

export async function getAllUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.find();
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
import type { NextFunction, Request, Response } from 'express';
import { InterveiwPost } from '../models/interveiwPostModel.ts';

export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      hrId,
      domainId,
      jobTitle,
      description,
      qualification,
      experienceRequired,
      hiringDriveStart,
      hiringDriveEnd,
      location,
      address,
      email,
      phone,
      salary,
      openVacancies,
      driveStatus,
    } = req.body;

    if (
      !(
        hrId &&
        domainId &&
        jobTitle &&
        description &&
        qualification &&
        experienceRequired &&
        hiringDriveStart &&
        hiringDriveEnd &&
        location &&
        address &&
        email &&
        phone &&
        salary &&
        openVacancies &&
        driveStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    let post = new InterveiwPost({
      hrId: hrId,
      domainId: domainId,
      jobTitle: jobTitle,
      description: description,
      qualification: qualification,
      experienceRequired: experienceRequired,
      hiringDriveStart: hiringDriveStart,
      hiringDriveEnd: hiringDriveEnd,
      location: location,
      address: address,
      email: email,
      phone: phone,
      salary: salary,
      openVacancies: openVacancies,
      driveStatus: driveStatus,
    });

    post = await post.save();

    return res.status(201).json({
      success: true,
      message: 'Post created successfully.',
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
  const {
    postId,
    hrId,
    domainId,
    jobTitle,
    description,
    qualification,
    experienceRequired,
    hiringDriveStart,
    hiringDriveEnd,
    location,
    address,
    email,
    phone,
    salary,
    openVacancies,
    driveStatus,
  } = req.body;

  if (
    !(
      postId &&
      hrId &&
      domainId &&
      jobTitle &&
      description &&
      qualification &&
      experienceRequired &&
      hiringDriveStart &&
      hiringDriveEnd &&
      location &&
      address &&
      email &&
      phone &&
      salary &&
      openVacancies &&
      driveStatus
    )
  ) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  let post = await InterveiwPost.findByIdAndUpdate(
    {
      _id: postId,
    },
    {
      domainId: domainId,
      jobTitle: jobTitle,
      description: description,
      qualification: qualification,
      experienceRequired: experienceRequired,
      hiringDriveStart: hiringDriveStart,
      hiringDriveEnd: hiringDriveEnd,
      location: location,
      address: address,
      email: email,
      phone: phone,
      salary: salary,
      openVacancies: openVacancies,
      driveStatus: driveStatus,
    },
    { new: true },
  );

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Post not found.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Post updated successfully.',
  });
}

export async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { hrId } = req.body;
    if (!hrId) {
      return res.status(400).json({
        success: false,
        message: 'HrId is required.',
      });
    }
    const posts = await InterveiwPost.find({ hrId });

    return res.status(200).json({
      success: true,
      message: 'All post is fectched successfully.',
      data: posts ?? [],
    });
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    const { hrId, postId } = req.body;
    if (!(hrId && postId)) {
      return res.status(400).json({
        success: false,
        message: 'All feilds are required.',
      });
    }
    const post = await InterveiwPost.findOneAndDelete({ _id: postId, hrId });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'All post is fectched successfully.',
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await InterveiwPost.find();

    return res.status(200).json({
      success: true,
      message: 'All post is fectched successfully.',
      data: posts ?? [],
    });
  } catch (error) {
    next(error);
  }
}

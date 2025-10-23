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

  const {id} = req.params;
  if (
    !(
      id &&
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
      _id: id,
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
    data:post
  });
}

export async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    console.log(id)
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'HrId is required.',
      });
    }
    const posts = await InterveiwPost.find({hrId:id});

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
    const { hrId } = req.body;
    const {id} = req.params;
    if (!(id && hrId)) {
      return res.status(400).json({
        success: false,
        message: 'All feilds are required.',
      });
    }
    const post = await InterveiwPost.findOneAndDelete({ _id: id, hrId:hrId });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post is deleted successfully.',
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

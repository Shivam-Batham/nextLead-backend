import type { NextFunction, Request, Response } from 'express';
import { DriveAttendies } from '../models/driveAttendiesModel.ts';

export async function CreateDriveAttendies(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, interveiwPostId, resumeLink } = req.body;
    if (!(userId && interveiwPostId)) {
      return res.status(400).json({
        success: false,
        message: 'All feilds are required.',
      });
    }

    const data = await DriveAttendies.findOne({ userId: userId, interveiwPostId: interveiwPostId });

    if (data) {
      return res.status(200).json({
        success: true,
        message: 'You are already attending this Drive.',
        data: data,
      });
    }

    let driveData = new DriveAttendies({
      userId: userId,
      interveiwPostId: interveiwPostId,
      resumeLink: resumeLink,
    });

    driveData = await driveData.save();

    return res.status(200).json({
      success: true,
      message: 'You are going in this drive.',
      data: driveData,
    });
  } catch (error) {
    next(error);
  }
}

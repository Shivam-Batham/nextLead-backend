import mongoose, { Schema, Types } from 'mongoose';

interface Idrive {
  user_Id: Types.ObjectId;
  interveiwPost_Id: Types.ObjectId;
  resume?: string;
}

const driveAttendiesSchema = new mongoose.Schema<Idrive>(
  {
    user_Id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    interveiwPost_Id: {
      type: Schema.Types.ObjectId,
      ref: 'InterveiwPost',
      required: true,
    },
    resume: {
      type: String,
    },
  },
  { timestamps: true },
);

export const DriveAttendies = mongoose.model<Idrive>('DriveAttendies', driveAttendiesSchema);

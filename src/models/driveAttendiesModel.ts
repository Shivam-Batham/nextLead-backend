import mongoose, { Schema, Types } from 'mongoose';

interface Idrive {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  interveiwPostId: Types.ObjectId;
  resume?: string;
}

const driveAttendiesSchema = new mongoose.Schema<Idrive>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    interveiwPostId: {
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

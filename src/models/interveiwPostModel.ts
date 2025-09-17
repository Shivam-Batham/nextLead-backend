import mongoose, { Schema, Types } from 'mongoose';

interface Ipost {
  hr_Id: Types.ObjectId;
  domain_Id: Types.ObjectId;
  jobTitle: string;
  description: string;
  qualification: string;
  experienceRequired: string;
  hiringDriveStart: string;
  hiringDriveEnd: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  salary: string;
  openVacancies: number;
  candidateApplyCount: number;
  driveStatus: boolean;
}

const postSchema = new mongoose.Schema<Ipost>(
  {
    hr_Id: {
      type: Schema.Types.ObjectId,
      ref: 'Hr',
      required: true,
    },
    domain_Id: {
      type: Schema.Types.ObjectId,
      ref: 'Domain',
      required: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required.'],
    },
    description: {
      type: String,
      required: [true, 'description is required.'],
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required.'],
    },
    experienceRequired: {
      type: String,
      required: [true, 'ExperienceRequired is required.'],
    },
    hiringDriveStart: {
      type: String,
      required: [true, 'Hiring drive start date is required.'],
    },
    hiringDriveEnd: {
      type: String,
      required: [true, 'Hiring drive end date is required.'],
    },
    location: {
      type: String,
      required: [true, 'Location is required.'],
    },
    address: {
      type: String,
      required: [true, 'Address is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required.'],
    },
    salary: {
      type: String,
      required: [true, 'Salary is required.'],
    },
    openVacancies: {
      type: Number,
      required: [true, 'OpenVacancies is required.'],
    },
    candidateApplyCount: {
      type: Number,
      default: 0,
    },
    driveStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const InterveiwPost = mongoose.model<Ipost>('InterveiwPost', postSchema);

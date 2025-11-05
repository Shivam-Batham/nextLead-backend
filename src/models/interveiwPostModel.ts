import mongoose, { Schema, Types } from 'mongoose';

interface Ipost {
  _id?: Types.ObjectId;
  hrId: Types.ObjectId;
  domainId: Types.ObjectId;
  company: string;
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
  time?: string;
  featured?: boolean;
}

const postSchema = new mongoose.Schema<Ipost>(
  {
    hrId: {
      type: Schema.Types.ObjectId,
      ref: 'Hr',
      required: true,
    },
    domainId: {
      type: Schema.Types.ObjectId,
      ref: 'Domain',
      // required: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required.'],
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required.'],
    },
    experienceRequired: {
      type: String,
      required: [true, 'Experience is required.'],
    },
    hiringDriveStart: {
      type: String,
      required: [true, 'Hiring drive start date is required.'],
    },
    hiringDriveEnd: {
      type: String,
      required: [true, 'Hiring drive end date is required.'],
    },
    time: {
      type: String,
      default: '',
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
    featured: {
      type: Boolean,
      default: false,
    },
    driveStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const InterveiwPost = mongoose.model<Ipost>('InterveiwPost', postSchema);

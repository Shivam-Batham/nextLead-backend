import mongoose from 'mongoose';

interface Ihr {
  name: string;
  password: string;
  email: string;
  contact: string;
  location: string;
  previousHiredNumber: number;
  jobPostCount: number;
  totalHiringDriveCount: number;
  company: string;
  city: string;
  state: string;
  country: string;
  profilePhotoUrl?: string;
  accessToken?: string;
  refreshToken?: string;
}

const HrSchema = new mongoose.Schema<Ihr>(
  {
    name: {
      type: String,
      required: true,
      minLength: [1, 'Name must have atleast 1 character.'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: [1, 'Email is required.'],
    },
    contact: {
      type: String,
      unique: true,
      required: true,
      minLength: [10, 'Contact number is required.'],
    },
    location: {
      type: String,
    },
    previousHiredNumber: {
      type: Number,
    },
    jobPostCount: {
      type: Number,
    },
    totalHiringDriveCount: {
      type: Number,
    },
    company: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    profilePhotoUrl: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Hr = mongoose.model<Ihr>('Hr', HrSchema);

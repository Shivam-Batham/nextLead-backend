import mongoose from 'mongoose';

interface Iuser {
  name: string;
  password: string;
  email: string;
  contact: string;
  resumeLink: string;
  projects?: Array<project>;
  accessToken?: string;
  refreshToken?: string;
  domain?: string;
}

type project = {
  projectName: string;
  projectLink: string;
  projectDescription?: string;
};

const UserSchema = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
      minLength: [1, 'Name must have atleast 1 character.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
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
    resumeLink: {
      type: String,
    },
    projects: {
      type: [Object],
    },
    domain: {
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

export const User = mongoose.model('User', UserSchema);

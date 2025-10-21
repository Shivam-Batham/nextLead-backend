import bcrypt from 'bcryptjs';
import mongoose, { Model, Types } from 'mongoose';
import jwt, { type Secret } from 'jsonwebtoken';

export interface Iuser {
  _id?: Types.ObjectId;
  name: string;
  password: string;
  bio?: string;
  skills?: Array<string>;
  experience?: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    period: string;
  }>;
  email: string;
  contact?: string;
  resumeLink?: string;
  profilePhotoLink?: string;
  projects?: Array<project>;
  accessToken?: string;
  refreshToken?: string;
  domain?: string;
}


export interface IuserMethods {
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export type UserModel = Model<Iuser, {}, IuserMethods>;

type project = {
  projectName: string;
  projectLink: string;
  projectDescription?: string;
};

const UserSchema = new mongoose.Schema<Iuser, UserModel, IuserMethods>(
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
    bio: {
      type: String,
    },
    skills: {
      type: [String],
    },
    experience: {
      type: [Object],
    },
    education: {
      type: [Object],
    },
    profilePhotoLink: {
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

// save password in encrypted hash
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Short lived token
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      user: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: '2d' },
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: '7d' });
};

const User = mongoose.model<Iuser, UserModel>('User', UserSchema);
export default User;

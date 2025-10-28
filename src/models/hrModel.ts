import bcrypt from 'bcryptjs';
import mongoose, { Model, Types } from 'mongoose';
import jwt, { type Secret } from 'jsonwebtoken';

export interface Ihr {
  _id?: Types.ObjectId;
  name: string;
  password: string;
  email: string;
  contact: string;
  location?: string;
  previousHiredNumber?: number;
  jobPostCount?: number;
  totalHiringDriveCount?: number;
  company?: string;
  city?: string;
  state?: string;
  country?: string;
  profilePhotoUrl?: string;
  accessToken?: string;
  refreshToken?: string;
  bio?:string;
  skills?: string[];
  experience?: Array<{
    company?: string;
    position?: string;
    period?: string;
    description?: string;
  }>;
  education?: Array<{
    institution?: string;
    degree?: string;
    period?: string;
  }>;
  role?: string;
}

export interface IHrMethods {
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export type HrModel = Model<Ihr, {}, IHrMethods>;

const HrSchema = new mongoose.Schema<Ihr, HrModel, IHrMethods>(
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
    password: {
      type: String,
      required: true,
      minLength: [1, 'Password is required.'],
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
    bio:  {
      type: String,
    },
    skills: [{ type: String }],
    experience: [
      {
        company: String,
        position: String,
        period: String,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        period: String,
      },
    ],
    role: { type: String, default: "recruiter" },
  },
  { timestamps: true },
);

// save password in encrypted hash
HrSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

HrSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// short lived token
HrSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: '2d' },
  );
};

// long lived token
HrSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    { expiresIn: '7d' },
  );
};

const Hr = mongoose.model<Ihr, HrModel>('Hr', HrSchema);
export default Hr;

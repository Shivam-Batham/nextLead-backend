import mongoose, { Types } from 'mongoose';

interface Idomain {
  _id: Types.ObjectId;
  domainName: string;
}

const domainSchema = new mongoose.Schema<Idomain>(
  {
    domainName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Domain = mongoose.model<Idomain>('Domain', domainSchema);

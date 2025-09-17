import mongoose from 'mongoose';

interface Idomain {
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

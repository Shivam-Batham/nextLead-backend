import { Types, Document, Model } from 'mongoose';
export interface Idomain {
    _id: Types.ObjectId;
    domainName: string;
}
export interface IdomainDocument extends Omit<Idomain, '_id'>, Document {
    _id: Types.ObjectId;
}
export declare const Domain: Model<IdomainDocument>;
//# sourceMappingURL=domainModel.d.ts.map
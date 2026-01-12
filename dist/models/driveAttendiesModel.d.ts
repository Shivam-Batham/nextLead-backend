import { Types, Document, Model } from 'mongoose';
export interface Idrive {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    interveiwPostId: Types.ObjectId;
    resume?: string;
}
export interface IdriveDocument extends Omit<Idrive, '_id'>, Document {
    _id: Types.ObjectId;
}
export declare const DriveAttendies: Model<IdriveDocument>;
//# sourceMappingURL=driveAttendiesModel.d.ts.map
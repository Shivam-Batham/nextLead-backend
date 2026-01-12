import { Types, Document, Model } from 'mongoose';
export interface Ipost {
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
export interface IpostDocument extends Omit<Ipost, '_id'>, Document<Types.ObjectId> {
    _id: Types.ObjectId;
}
export type InterveiwPostModel = Model<IpostDocument>;
export declare const InterveiwPost: InterveiwPostModel;
//# sourceMappingURL=interveiwPostModel.d.ts.map
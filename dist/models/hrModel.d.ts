import { Document, Model, Types } from 'mongoose';
export type HrExperience = {
    company?: string;
    position?: string;
    period?: string;
    description?: string;
};
export type HrEducation = {
    institution?: string;
    degree?: string;
    period?: string;
};
export interface IhrBase {
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
    bio?: string;
    skills?: string[];
    experience?: HrExperience[];
    education?: HrEducation[];
    role?: string;
}
export interface IhrDocument extends IhrBase, Document<Types.ObjectId> {
    _id: Types.ObjectId;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}
export interface HrModel extends Model<IhrDocument> {
}
declare const Hr: HrModel;
export default Hr;
//# sourceMappingURL=hrModel.d.ts.map
import { Model, Types, Document } from 'mongoose';
export type Experience = {
    company: string;
    position: string;
    period: string;
    description: string;
};
export type Education = {
    institution: string;
    degree: string;
    period: string;
};
export type Project = {
    projectName: string;
    projectLink: string;
    projectDescription?: string;
};
export interface Iuser {
    _id?: Types.ObjectId;
    name: string;
    password: string;
    bio?: string;
    skills?: string[];
    experience?: Experience[];
    education?: Education[];
    email: string;
    contact?: string;
    resumeLink?: string;
    profilePhotoLink?: string;
    projects?: Project[];
    accessToken?: string;
    refreshToken?: string;
    domain?: string;
    role?: string;
}
export interface IuserMethods {
    isPasswordCorrect(this: IUserDocument, password: string): Promise<boolean>;
    generateAccessToken(this: IUserDocument): string;
    generateRefreshToken(this: IUserDocument): string;
}
export type IUserDocument = Iuser & Document<Types.ObjectId> & IuserMethods;
export type UserModel = Model<IUserDocument, {}, IuserMethods>;
declare const User: UserModel;
export default User;
//# sourceMappingURL=userModal.d.ts.map
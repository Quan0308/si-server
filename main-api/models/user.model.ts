import { BaseModel } from '@libs/base';
import { Schema, Document } from 'mongoose';
import { injectable } from 'tsyringe';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  status: string;
  avatarKey: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  { timestamps: true }
);

@injectable()
export class UserModel extends BaseModel<IUser> {
  constructor() {
    super(userSchema, 'users');
  }
}
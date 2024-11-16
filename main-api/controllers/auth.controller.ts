import { RegisterDto } from 'main-api/dtos';
import { UserModel } from 'main-api/models/user.model';
import { inject, injectable } from 'tsyringe';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '@libs/types';
import bcrypt from 'bcrypt';
import { IUser } from '../models/user.model';
@injectable()
export class AuthController {
  constructor(@inject(UserModel) private userModel: UserModel) {}

  async register(plain: RegisterDto): Promise<string> {
    try {
      const data = plainToClass(RegisterDto, plain);
      try {
        await validateOrReject(data);
      } catch (err) {
        throw new ValidationException(err);
      }
      const { email, password } = data;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.userModel.create({ email, password: hashedPassword });
      return 'Register successfully';
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  async login(plain: {
    email: string;
    password: string;
  }): Promise<{ accessToken: IUser; refreshToken: string }> {
    try {
      const user = await this.userModel.findOne({ email: plain.email });
      const compared = user
        ? await bcrypt.compare(plain.password, user.password)
        : false;
      if (!user || !compared) {
        new Error('Invalid email or password');
      }

      return { accessToken: user.id, refreshToken: 'refresh' };
    } catch (err) {
      throw err;
    }
  }
}

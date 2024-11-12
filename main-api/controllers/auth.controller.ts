import { UserModel } from 'main-api/models/user.model';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthController {
  constructor(@inject(UserModel) private userModel: UserModel) {}

  async register(data: any) {
    return await this.userModel.create(data);
  }
}

import { AuthController } from 'main-api/controllers/auth.controller';
import { container, inject, singleton } from 'tsyringe';

@singleton()
class Internal {
  constructor(@inject(AuthController) private authController: AuthController) {}

  getAuthController() {
    return this.authController;
  }
}

const InternalProvider = container.resolve(Internal);
export default InternalProvider;

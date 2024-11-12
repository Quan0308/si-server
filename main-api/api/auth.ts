import { Router, Request, Response } from 'express';
import internalProvider from 'main-api/providers/internal';

const authRouter = Router();

authRouter.post('/register', (req: Request, res: Response) => {
  const authController = internalProvider.getAuthController();
  const newUser = authController.register(req.body);
  res.send(newUser);
});
authRouter.post('/login', (req: Request, res: Response) => {});

export default authRouter;

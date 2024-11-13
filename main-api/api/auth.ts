import 'reflect-metadata';
import { Router, Request, Response, NextFunction } from 'express';
import { ErrorResponse, SuccessResponse } from '@libs/types';
import internalProvider from 'main-api/providers/internal';

const authRouter = Router();

authRouter.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authController = internalProvider.getAuthController();
      const newUser = await authController.register(req.body);
      res.status(200).json(new SuccessResponse(newUser));
    } catch (error) {
      next(error);
    }
  }
);
authRouter.post('/login', (_: Request, __: Response) => {});

export default authRouter;

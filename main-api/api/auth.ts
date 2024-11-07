import { Router, Request, Response } from 'express';
import internalProvider from 'main-api/providers/internal';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  const authController = internalProvider.getAuthController();
  const newUser = authController.register(req.body);
  res.send(newUser);
});
router.post('/login', (req: Request, res: Response) => {});

export default router;

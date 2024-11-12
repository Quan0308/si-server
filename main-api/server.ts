import 'reflect-metadata';
import { Application, default as express, Request, Response } from 'express';
import { authRouter } from './api';
import Config from '@libs/config';
import { container } from 'tsyringe';

function initRoutes(app: Application) {
  app.use('/api/v1/auth', authRouter);
}

export async function server() {
  const app = express();
  const config = container.resolve(Config);
  await config.connectDB();

  initRoutes(app);
  const port = config.get('PORT');
  app.get('/', (_: Request, res: Response) => {
    res.send('pong');
  });
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

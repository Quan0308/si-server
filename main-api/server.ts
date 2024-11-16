import 'reflect-metadata';
import {
  Application,
  default as express,
  Request,
  Response,
  urlencoded,
} from 'express';
import { authRouter } from './api';
import bodyParser from 'body-parser';
import Config from '@libs/config';
import { container } from 'tsyringe';
import { ErrorHandler } from './middlewares';

function initRoutes(app: Application) {
  app.use(bodyParser.json());

  app.use(urlencoded({ extended: true }));
  app.use('/api/v1/auth', authRouter);
}

function initMiddlewares(app: Application) {
  app.use(ErrorHandler);
}

export async function server() {
  const app = express();
  const config = container.resolve(Config);
  await config.connectDB();

  initRoutes(app);

  initMiddlewares(app);
  const port = config.get('PORT');
  app.get('/', (_: Request, res: Response) => {
    res.send('pong');
  });
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { CelebrateError } from 'celebrate';
import { ValidationError } from 'joi';

import cors from 'cors';

import '@shared/infra/typeorm';
import '@shared/container';

import AppError from '@shared/errors/AppError';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  async (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    if (err instanceof CelebrateError) {
      const message = Array.from(err.details).map(
        (error: [string, ValidationError]) => ({
          [error[0]]: error[1].message,
        }),
      );

      return response.status(400).json({
        status: 'error',
        message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server start on port 3333');
});

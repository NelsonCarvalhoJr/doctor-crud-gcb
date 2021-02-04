import express, { Request, Response, NextFunction } from 'express';

import '@shared/infra/typeorm';
import '@shared/container';

import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());

app.use(
  async (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
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

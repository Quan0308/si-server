import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '@libs/types';
import { Error } from 'mongoose';

export function ErrorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  const status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof Error.ValidationError) {
    message = getFirstValidationError(err);
  }

  const errorResponse = new ErrorResponse(status, message);
  res.status(status).json(errorResponse);
}

function getFirstValidationError(error: Error.ValidationError) {
  const firstError = Object.values(error.errors)[0];
  return firstError.message;
}

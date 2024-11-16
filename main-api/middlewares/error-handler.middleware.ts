import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, ValidationException } from '@libs/types';
import { Error } from 'mongoose';
import { ValidationError } from 'class-validator';

export function ErrorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof Error.ValidationError) {
    message = getFirstValidationError(err);
  } else if (err instanceof ValidationException) {
    const constraints = getConstraints(err.errors[0]);
    const firstKey = Object.keys(constraints)[0];
    message = constraints[firstKey];
  }

  const errorResponse = new ErrorResponse(status, message);
  res.status(status).json(errorResponse);
}

function getFirstValidationError(error: Error.ValidationError) {
  const firstError = Object.values(error.errors)[0];
  return firstError.message;
}

export function getConstraints(error: ValidationError): Record<string, string> {
  if (error.constraints) {
    return error.constraints;
  }

  let constraints = {};
  if (error.children) {
    for (const child of error.children) {
      constraints = {
        ...constraints,
        ...getConstraints(child),
      };
    }
  }
  return constraints;
}

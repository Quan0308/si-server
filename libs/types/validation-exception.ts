import { ValidationError } from 'class-validator';

export class ValidationException extends Error {
  public statusCode: number;
  public errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super('Validation failed');
    this.statusCode = 400;
    this.errors = errors;
  }
}

import { BaseResponse } from '@libs/base';

export class ErrorResponse<T> extends BaseResponse<T> {
  constructor(
    status: number,
    message: string = 'An error occurred',
    data: T | null = null
  ) {
    super(status, message, data);
  }
}

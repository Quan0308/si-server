import { BaseResponse } from '../base';

export class SuccessResponse<T> extends BaseResponse<T> {
  constructor();
  constructor(data: T);
  constructor(message: string, data: T);

  constructor(messageOrData?: string | T, data?: T) {
    if (typeof messageOrData === 'string') {
      super(200, messageOrData, data || null);
    } else {
      super(200, 'Success', messageOrData || null);
    }
  }
}

export interface IBaseResponse<T> {
  status: number;
  message: string;
  data: T | null;
}

export class BaseResponse<T> implements IBaseResponse<T> {
  status: number;
  message: string;
  data: T | null;

  constructor(
    status: number = 500,
    message: string = '',
    data: T | null = null
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  getStatus(): number {
    return this.status;
  }

  getMessage(): string {
    return this.message;
  }

  getData(): T | null {
    return this.data;
  }
}

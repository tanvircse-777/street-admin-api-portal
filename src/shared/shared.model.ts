export interface CommonResponse<T>{
    code: number;
    message: string;
    data: T;
}

export enum CommonStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
  }
  
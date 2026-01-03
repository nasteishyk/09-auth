import { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export type ApiErrorResponse = {
  message?: string;
  error?: string;
  validation?: {
    body?: {
      message?: string;
    };
  };
};
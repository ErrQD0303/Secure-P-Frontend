import { ErrorResponse } from "react-router-dom";
import { BackendLogServerError } from "../../exceptions/BackendLogServerError";

export const isBackendLogServerError = (
  error: unknown
): error is BackendLogServerError => {
  return error instanceof BackendLogServerError;
};

export const isErrorResponse = (error: unknown): error is ErrorResponse =>
  (error as ErrorResponse).data !== undefined;

export const isTypeError = (error: unknown): error is TypeError =>
  (error as TypeError).message !== undefined;

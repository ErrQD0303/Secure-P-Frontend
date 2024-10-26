import { BackendLogServerError } from "../../exceptions/BackendLogServerError";

export const isBackendLogServerError = (
  error: unknown
): error is BackendLogServerError => {
  return error instanceof BackendLogServerError;
};

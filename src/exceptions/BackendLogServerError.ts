export class BackendLogServerError extends Error {
  constructor(message: string, innerError: Error) {
    super(message);
    this.innerError = innerError;
  }
  innerError: Error;
  level: string = "error";
}

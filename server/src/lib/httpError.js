export class HttpError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const badRequest = (msg = "Bad request", code) => new HttpError(400, msg, code);
export const unauthorized = (msg = "Unauthorized", code) => new HttpError(401, msg, code);
export const forbidden = (msg = "Forbidden", code) => new HttpError(403, msg, code);
export const notFound = (msg = "Not found", code) => new HttpError(404, msg, code);
export const conflict = (msg = "Conflict", code) => new HttpError(409, msg, code);

/* Wraps an async route handler so thrown/rejected errors reach the error
   middleware instead of crashing the process. */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

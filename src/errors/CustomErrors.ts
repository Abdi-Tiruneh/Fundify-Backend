export class ResourceNotFoundError extends Error {
  public status: number;

  constructor(message: string = "Resource not found.") {
    super(message);
    this.name = "ResourceNotFoundError";
    this.status = 404;
  }
}

export class ConflictError extends Error {
  public status: number;

  constructor(message: string = "Conflict.") {
    super(message);
    this.name = "ConflictError";
    this.status = 409;
  }
}

export class UnauthorizedError extends Error {
  public status: number;

  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

export class BadRequestError extends Error {
  public status: number;

  constructor(message: string = "Bad Request") {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
}

export class ForbiddenError extends Error {
  public status: number;

  constructor(message: string = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
    this.status = 403;
  }
}

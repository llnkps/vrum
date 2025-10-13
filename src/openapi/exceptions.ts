import { ResponseError } from "./client/runtime";

// Base custom exception class
export class CustomException extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Authentication exceptions
export class AuthenticationException extends CustomException {
  constructor(message: string = "Authentication failed", code?: string) {
    super(message, 401, code);
  }
}

export class TokenExpiredException extends AuthenticationException {
  constructor(message: string = "Access token has expired") {
    super(message, "TOKEN_EXPIRED");
  }
}

export class TokenRefreshException extends AuthenticationException {
  constructor(message: string = "Failed to refresh token") {
    super(message, "TOKEN_REFRESH_FAILED");
  }
}

export class InvalidTokenException extends AuthenticationException {
  constructor(message: string = "Invalid or malformed token") {
    super(message, "INVALID_TOKEN");
  }
}

// Authorization exceptions
export class AuthorizationException extends CustomException {
  constructor(message: string = "Access denied", code?: string) {
    super(message, 403, code);
  }
}

// Network exceptions
export class NetworkException extends CustomException {
  constructor(message: string = "Network error", code?: string) {
    super(message, 503, code);
  }
}

export class ServiceUnavailableException extends NetworkException {
  constructor(message: string = "Service temporarily unavailable") {
    super(message, "SERVICE_UNAVAILABLE");
  }
}

// Validation exceptions
export class ValidationException extends CustomException {
  constructor(message: string = "Validation failed", code?: string) {
    super(message, 400, code);
  }
}

export class MissingParameterException extends ValidationException {
  constructor(parameter: string) {
    super(`Missing required parameter: ${parameter}`, "MISSING_PARAMETER");
  }
}

// Utility function to convert OpenAPI ResponseError to custom exceptions
export function convertResponseError(error: ResponseError): CustomException {
  const status = error.response.status;
  const message = error.message || `HTTP ${status} error`;

  switch (status) {
    case 401:
      return new AuthenticationException(message);
    case 403:
      return new AuthorizationException(message);
    case 400:
      return new ValidationException(message);
    case 503:
      return new ServiceUnavailableException(message);
    default:
      return new CustomException(message, status);
  }
}

// Utility function to check if an error is a specific type
export function isAuthenticationError(error: unknown): error is AuthenticationException {
  return error instanceof AuthenticationException;
}

export function isNetworkError(error: unknown): error is NetworkException {
  return error instanceof NetworkException;
}

export function isValidationError(error: unknown): error is ValidationException {
  return error instanceof ValidationException;
}

// Utility function to get error details for logging
export function getErrorDetails(error: unknown): {
  name: string;
  message: string;
  statusCode?: number;
  code?: string;
  stack?: string;
} {
  if (error instanceof CustomException) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      stack: error.stack,
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    name: "UnknownError",
    message: String(error),
  };
}

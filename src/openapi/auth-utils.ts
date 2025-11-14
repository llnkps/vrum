import { tokenManager } from '../utils/token-manager';

// Helper function to create authenticated API calls with automatic token refresh
export async function createAuthenticatedApiCall<T>(apiCall: () => Promise<T>): Promise<T> {
  try {
    return await apiCall();
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Try to refresh token
      const refreshed = await tokenManager.refreshAccessToken();
      console.log('Token refresh result:', refreshed);
      if (refreshed) {
        // Retry the API call with new token
        try {
          console.log('MAKE ONE MORE TRY AFTER REFRESH');
          return await apiCall();
        } catch (retryError: any) {
          if (retryError.response?.status === 401) {
            // Refresh failed, logout
            await tokenManager.logout();
          }
          throw retryError;
        }
      } else {
        // Refresh failed, logout
        await tokenManager.logout();
      }
    }
    throw error;
  }
}

// Custom exceptions for RN
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

export class AuthenticationException extends CustomException {
  constructor(message: string = 'Authentication failed', code?: string) {
    super(message, 401, code);
  }
}

export class NetworkException extends CustomException {
  constructor(message: string = 'Network error', code?: string) {
    super(message, 503, code);
  }
}

export class ValidationException extends CustomException {
  constructor(message: string = 'Validation failed', code?: string) {
    super(message, 400, code);
  }
}

// Utility function to handle API errors
export function handleApiError(error: unknown): never {
  if (error instanceof CustomException) {
    throw error;
  }

  if (error instanceof Error) {
    throw new CustomException(error.message, 500);
  }

  throw new CustomException('Unknown error', 500);
}

// Utility function to check error types
export function isAuthenticationError(error: unknown): error is AuthenticationException {
  return error instanceof AuthenticationException;
}

export function isNetworkError(error: unknown): error is NetworkException {
  return error instanceof NetworkException;
}

export function isValidationError(error: unknown): error is ValidationException {
  return error instanceof ValidationException;
}

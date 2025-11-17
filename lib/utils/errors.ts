/**
 * Error Handling Utilities
 * 
 * Centralized error handling and custom error classes
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 500, "DATABASE_ERROR");
    this.name = "DatabaseError";
    if (originalError) {
      this.cause = originalError;
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public fields?: Record<string, string>) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

/**
 * Handle errors and return a user-friendly response
 */
export function handleError(error: unknown): {
  message: string;
  statusCode: number;
  code?: string;
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    // Log unexpected errors in development
    if (process.env.NODE_ENV === "development") {
      console.error("Unexpected error:", error);
    }
    return {
      message: "An unexpected error occurred",
      statusCode: 500,
    };
  }

  return {
    message: "An unknown error occurred",
    statusCode: 500,
  };
}


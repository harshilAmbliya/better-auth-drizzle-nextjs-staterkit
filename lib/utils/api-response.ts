/**
 * API Response Utilities
 * 
 * Standardized API response helpers for consistent error handling
 */

import { NextResponse } from "next/server";
import { handleError } from "./errors";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
};

/**
 * Create a successful API response
 */
export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    } as ApiResponse<T>,
    { status }
  );
}

/**
 * Create an error API response
 */
export function errorResponse(
  error: unknown,
  status?: number
): NextResponse<ApiResponse> {
  const handled = handleError(error);
  
  return NextResponse.json(
    {
      success: false,
      error: handled.message,
      code: handled.code,
    } as ApiResponse,
    { status: status || handled.statusCode }
  );
}

/**
 * Create a not found response
 */
export function notFoundResponse(resource: string = "Resource") {
  return errorResponse(new Error(`${resource} not found`), 404);
}


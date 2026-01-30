import { type ApiError } from '@/lib/types';

export function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'ERROR',
    };
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as { message?: string; code?: string };
    return {
      message: err.message || 'An unexpected error occurred',
      code: err.code || 'UNKNOWN_ERROR',
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
}

export function isPostgresError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error
  );
}

export function isDuplicateKeyError(error: unknown): boolean {
  return (
    isPostgresError(error) &&
    (error as { code?: string }).code === '23505'
  );
}

export function isForeignKeyError(error: unknown): boolean {
  return (
    isPostgresError(error) &&
    (error as { code?: string }).code === '23503'
  );
}

export function isNotNullViolation(error: unknown): boolean {
  return (
    isPostgresError(error) &&
    (error as { code?: string }).code === '23502'
  );
}

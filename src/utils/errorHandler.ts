/**
 * 에러 처리 유틸리티
 */

export class SyncError extends Error {
  code: string;
  originalError?: Error;

  constructor(message: string, code: string, originalError?: Error) {
    super(message);
    this.name = 'SyncError';
    this.code = code;
    this.originalError = originalError;
  }
}

export class ValidationError extends SyncError {
  field: string;

  constructor(message: string, field: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class NetworkError extends SyncError {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

export class ParseError extends SyncError {
  content?: string;

  constructor(message: string, content?: string) {
    super(message, 'PARSE_ERROR');
    this.name = 'ParseError';
    this.content = content;
  }
}

/**
 * 에러를 적절한 SyncError로 변환
 */
export const wrapError = (error: unknown, context: string): SyncError => {
  if (error instanceof SyncError) {
    return error;
  }

  if (error instanceof Error) {
    // 네트워크 에러 감지
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new NetworkError(`${context}: ${error.message}`, undefined);
    }

    // 파싱 에러 감지
    if (error.message.includes('parse') || error.message.includes('JSON')) {
      return new ParseError(`${context}: ${error.message}`);
    }

    return new SyncError(
      `${context}: ${error.message}`,
      'UNKNOWN_ERROR',
      error
    );
  }

  return new SyncError(`${context}: 알 수 없는 오류`, 'UNKNOWN_ERROR');
};

/**
 * 에러 처리 및 로깅
 */
export const handleError = (error: unknown, context: string): void => {
  const syncError = wrapError(error, context);

  switch (syncError.code) {
    case 'NETWORK_ERROR':
      console.error(`🌐 네트워크 오류: ${syncError.message}`);
      break;
    case 'PARSE_ERROR':
      console.error(`📄 파싱 오류: ${syncError.message}`);
      break;
    case 'VALIDATION_ERROR':
      console.error(`⚠️ 유효성 검사 오류: ${syncError.message}`);
      break;
    default:
      console.error(`❌ 동기화 오류: ${syncError.message}`);
  }

  if (syncError.originalError) {
    console.error('원본 오류:', syncError.originalError);
  }
};

/**
 * 재시도 로직이 포함된 함수 실행
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxAttempts) {
        throw lastError;
      }

      console.warn(
        `시도 ${attempt}/${maxAttempts} 실패, ${delayMs}ms 후 재시도...`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  throw lastError!;
};

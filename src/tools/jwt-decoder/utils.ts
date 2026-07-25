import { decodeJwt, decodeProtectedHeader } from 'jose';

export interface JwtDecoded {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired?: boolean;
  expiresAt?: Date;
  issuedAt?: Date;
}

export interface DecodeResult {
  success: boolean;
  error?: string;
  data?: JwtDecoded;
}

export function decodeJwtToken(token: string): DecodeResult {
  if (!token.trim()) {
    return { success: false, error: 'Token is empty' };
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { success: false, error: 'Invalid JWT format. Expected 3 parts separated by dots.' };
    }

    const header = decodeProtectedHeader(token);
    const payload = decodeJwt(token);
    const signature = parts[2];

    let isExpired: boolean | undefined;
    let expiresAt: Date | undefined;
    let issuedAt: Date | undefined;

    if (payload.exp) {
      expiresAt = new Date(payload.exp * 1000);
      isExpired = expiresAt < new Date();
    }

    if (payload.iat) {
      issuedAt = new Date(payload.iat * 1000);
    }

    return {
      success: true,
      data: {
        header: header as Record<string, unknown>,
        payload: payload as Record<string, unknown>,
        signature,
        isExpired,
        expiresAt,
        issuedAt,
      },
    };
  } catch (e) {
    const error = e as Error;
    return { success: false, error: error.message };
  }
}

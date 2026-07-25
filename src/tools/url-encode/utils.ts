export interface UrlEncodeResult {
  success: boolean;
  error?: string;
  result?: string;
}

export type EncodeType = 'uri' | 'component';

export function encodeUrl(input: string, type: EncodeType): UrlEncodeResult {
  if (!input) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    const result = type === 'uri' ? encodeURI(input) : encodeURIComponent(input);
    return { success: true, result };
  } catch (e) {
    const error = e as Error;
    return { success: false, error: error.message };
  }
}

export function decodeUrl(input: string): UrlEncodeResult {
  if (!input.trim()) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    const result = decodeURIComponent(input);
    return { success: true, result };
  } catch (e) {
    const error = e as Error;
    return { success: false, error: error.message };
  }
}

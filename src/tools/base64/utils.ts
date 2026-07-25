export interface Base64Result {
  success: boolean;
  error?: string;
  result?: string;
}

export function encodeBase64(input: string, urlSafe: boolean = false): Base64Result {
  if (!input) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    let result = btoa(unescape(encodeURIComponent(input)));
    
    if (urlSafe) {
      result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    
    return { success: true, result };
  } catch (e) {
    const error = e as Error;
    return { success: false, error: error.message };
  }
}

export function decodeBase64(input: string, urlSafe: boolean = false): Base64Result {
  if (!input.trim()) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    let normalized = input;
    
    if (urlSafe) {
      normalized = normalized.replace(/-/g, '+').replace(/_/g, '/');
      // Add padding
      while (normalized.length % 4) {
        normalized += '=';
      }
    }
    
    const result = decodeURIComponent(escape(atob(normalized)));
    return { success: true, result };
  } catch (e) {
    const error = e as Error;
    return { success: false, error: error.message };
  }
}

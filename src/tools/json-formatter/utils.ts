export interface FormatResult {
  valid: boolean;
  error?: string;
  result?: string;
}

export function validateJson(input: string): FormatResult {
  if (!input.trim()) {
    return { valid: false, error: 'Input is empty' };
  }

  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e) {
    const error = e as Error;
    return { valid: false, error: error.message };
  }
}

export function formatJson(input: string, indent: number | 'tab'): FormatResult {
  if (!input.trim()) {
    return { valid: false, error: 'Input is empty' };
  }

  try {
    const parsed = JSON.parse(input);
    const indentStr = indent === 'tab' ? '\t' : ' '.repeat(indent);
    const result = JSON.stringify(parsed, null, indentStr);
    return { valid: true, result };
  } catch (e) {
    const error = e as Error;
    return { valid: false, error: error.message };
  }
}

export function minifyJson(input: string): FormatResult {
  if (!input.trim()) {
    return { valid: false, error: 'Input is empty' };
  }

  try {
    const parsed = JSON.parse(input);
    const result = JSON.stringify(parsed);
    return { valid: true, result };
  } catch (e) {
    const error = e as Error;
    return { valid: false, error: error.message };
  }
}

import { dump, load } from 'js-yaml';

export interface ConversionResult {
  success: boolean;
  error?: string;
  result?: string;
}

export function jsonToYaml(input: string): ConversionResult {
  if (!input.trim()) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    const parsed = JSON.parse(input);
    const result = dump(parsed, { indent: 2, lineWidth: -1 });
    return { success: true, result };
  } catch (e) {
    const error = e as Error;
    return { success: false, error: error.message };
  }
}

export function yamlToJson(input: string): ConversionResult {
  if (!input.trim()) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    const parsed = load(input);
    const result = JSON.stringify(parsed, null, 2);
    return { success: true, result };
  } catch (e) {
    const error = e as Error;
    return { success: false, error: error.message };
  }
}

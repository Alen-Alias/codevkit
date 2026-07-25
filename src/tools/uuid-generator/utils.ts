import { v4 as uuidv4 } from 'uuid';
import { nanoid, customAlphabet } from 'nanoid';

export function generateUUIDs(count: number): string[] {
  return Array.from({ length: count }, () => uuidv4());
}

export function generateNanoIDs(count: number, length: number, alphabet?: string): string[] {
  if (alphabet) {
    const customNanoid = customAlphabet(alphabet, length);
    return Array.from({ length: count }, () => customNanoid());
  }
  return Array.from({ length: count }, () => nanoid(length));
}

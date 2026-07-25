export interface RegexMatch {
  index: number;
  value: string;
  groups: string[];
}

export interface RegexResult {
  valid: boolean;
  error?: string;
  matches?: RegexMatch[];
}

export function testRegex(pattern: string, flags: string, testString: string): RegexResult {
  if (!pattern) {
    return { valid: false, error: 'Pattern is empty' };
  }

  if (testString.length > 50000) {
    return { valid: false, error: 'Test string too large (max 50KB)' };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes('g')) {
      let match;
      while ((match = regex.exec(testString)) !== null) {
        matches.push({
          index: match.index,
          value: match[0],
          groups: match.slice(1),
        });

        // Prevent infinite loop on zero-width matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
    } else {
      const match = regex.exec(testString);
      if (match) {
        matches.push({
          index: match.index,
          value: match[0],
          groups: match.slice(1),
        });
      }
    }

    return { valid: true, matches };
  } catch (e) {
    const error = e as Error;
    return { valid: false, error: error.message };
  }
}

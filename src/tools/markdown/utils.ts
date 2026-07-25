export function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function charCount(text: string): number {
  return text.length;
}

export const EXAMPLE_MARKDOWN = `# Welcome to Markdown Editor

A fast, offline Markdown editor with live preview.

## Features

- **Bold** and *italic* text
- \`inline code\` and code blocks
- [Links](https://example.com)
- Lists and tables

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

## Table

| Column A | Column B | Column C |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

> Blockquote: *"The best developer tools are the ones that get out of your way."*
`;

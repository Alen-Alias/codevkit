export interface ParsedCurl {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  auth?: { username: string; password: string };
}

export function parseCurl(command: string): ParsedCurl | null {
  const trimmed = command.trim();
  
  if (!trimmed.startsWith('curl')) {
    return null;
  }

  const result: ParsedCurl = {
    method: 'GET',
    url: '',
    headers: {},
  };

  // Simple regex-based parser
  const urlMatch = trimmed.match(/curl\s+(?:-[^\s]+\s+)*['"]?([^\s'"]+)['"]?/) || 
                   trimmed.match(/--url\s+['"]?([^\s'"]+)['"]?/);
  if (urlMatch) {
    result.url = urlMatch[1];
  }

  const methodMatch = trimmed.match(/-X\s+([A-Z]+)/);
  if (methodMatch) {
    result.method = methodMatch[1];
  }

  const headerMatches = trimmed.matchAll(/-H\s+['"]([^'"]+)['"]/g);
  for (const match of headerMatches) {
    const [key, ...valueParts] = match[1].split(':');
    result.headers[key.trim()] = valueParts.join(':').trim();
  }

  const dataMatch = trimmed.match(/(?:-d|--data|--data-raw)\s+['"]([^'"]+)['"]/);
  if (dataMatch) {
    result.body = dataMatch[1];
    if (result.method === 'GET') {
      result.method = 'POST';
    }
  }

  const authMatch = trimmed.match(/-u\s+['"]?([^:]+):([^\s'"]+)['"]?/);
  if (authMatch) {
    result.auth = { username: authMatch[1], password: authMatch[2] };
  }

  return result.url ? result : null;
}

export function generateFetch(parsed: ParsedCurl): string {
  const lines: string[] = [];
  const allHeaders = { ...parsed.headers };

  if (parsed.auth) {
    const { username, password } = parsed.auth;
    const encoded = btoa(`${username}:${password}`);
    allHeaders['Authorization'] = `Basic ${encoded}`;
  }
  
  lines.push(`fetch('${parsed.url}', {`);
  lines.push(`  method: '${parsed.method}',`);
  
  if (Object.keys(allHeaders).length > 0) {
    lines.push(`  headers: {`);
    for (const [key, value] of Object.entries(allHeaders)) {
      lines.push(`    '${key}': '${value}',`);
    }
    lines.push(`  },`);
  }
  
  if (parsed.body) {
    lines.push(`  body: '${parsed.body}',`);
  }
  
  lines.push(`})`);
  lines.push(`  .then(res => res.json())`);
  lines.push(`  .then(data => console.log(data));`);
  
  return lines.join('\n');
}

export function generatePython(parsed: ParsedCurl): string {
  const lines: string[] = [];
  
  lines.push(`import requests`);
  lines.push(``);
  
  if (Object.keys(parsed.headers).length > 0) {
    lines.push(`headers = {`);
    for (const [key, value] of Object.entries(parsed.headers)) {
      lines.push(`    '${key}': '${value}',`);
    }
    lines.push(`}`);
    lines.push(``);
  }
  
  const args: string[] = [`'${parsed.url}'`];
  if (Object.keys(parsed.headers).length > 0) {
    args.push(`headers=headers`);
  }
  if (parsed.body) {
    args.push(`data='${parsed.body}'`);
  }
  if (parsed.auth) {
    args.push(`auth=('${parsed.auth.username}', '${parsed.auth.password}')`);
  }
  
  lines.push(`response = requests.${parsed.method.toLowerCase()}(${args.join(', ')})`);
  lines.push(`print(response.json())`);
  
  return lines.join('\n');
}

export function generateAxios(parsed: ParsedCurl): string {
  const lines: string[] = [];
  
  lines.push(`const axios = require('axios');`);
  lines.push(``);
  lines.push(`axios({`);
  lines.push(`  method: '${parsed.method.toLowerCase()}',`);
  lines.push(`  url: '${parsed.url}',`);
  
  if (Object.keys(parsed.headers).length > 0) {
    lines.push(`  headers: {`);
    for (const [key, value] of Object.entries(parsed.headers)) {
      lines.push(`    '${key}': '${value}',`);
    }
    lines.push(`  },`);
  }
  
  if (parsed.body) {
    lines.push(`  data: '${parsed.body}',`);
  }
  
  if (parsed.auth) {
    lines.push(`  auth: {`);
    lines.push(`    username: '${parsed.auth.username}',`);
    lines.push(`    password: '${parsed.auth.password}',`);
    lines.push(`  },`);
  }
  
  lines.push(`})`);
  lines.push(`  .then(res => console.log(res.data))`);
  lines.push(`  .catch(err => console.error(err));`);
  
  return lines.join('\n');
}

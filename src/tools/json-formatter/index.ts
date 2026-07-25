import { Code } from 'lucide-react';
import { Plugin } from '@/lib/types';
import { JsonFormatterComponent } from './component';

export const jsonFormatterPlugin: Plugin = {
  id: 'json-formatter',
  slug: 'json-formatter',
  name: 'JSON Formatter',
  description: 'Format, minify, and validate JSON',
  category: 'formatters',
  icon: Code,
  keywords: ['json', 'format', 'validate', 'minify', 'beautify', 'parse'],
  shortcut: 'J',
  tags: ['json', 'format'],
  component: JsonFormatterComponent,
};

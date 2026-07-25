import { Terminal } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { CurlConverterComponent } from './component';

export const curlConverterPlugin: Plugin = {
  id: 'curl-converter',
  slug: 'curl-converter',
  name: 'cURL Converter',
  description: 'Convert cURL commands to JavaScript fetch, Python, and Axios',
  category: 'converters',
  icon: Terminal,
  keywords: ['curl', 'fetch', 'python', 'requests', 'http', 'convert', 'api', 'axios'],
  tags: ['curl', 'http', 'converter'],
  component: CurlConverterComponent,
};

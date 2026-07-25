import { Link2 } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { UrlEncodeComponent } from './component';

export const urlEncodePlugin: Plugin = {
  id: 'url-encode',
  slug: 'url-encode',
  name: 'URL Encoder/Decoder',
  description: 'Encode and decode URLs and URI components',
  category: 'encode-decode',
  icon: Link2,
  keywords: ['url', 'encode', 'decode', 'percent', 'uri', 'query', 'string'],
  tags: ['url', 'encode'],
  component: UrlEncodeComponent,
};

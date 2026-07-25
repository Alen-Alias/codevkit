import { Binary } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { Base64Component } from './component';

export const base64Plugin: Plugin = {
  id: 'base64',
  slug: 'base64',
  name: 'Base64 Encode/Decode',
  description: 'Encode and decode Base64 strings, including URL-safe variant',
  category: 'encode-decode',
  icon: Binary,
  keywords: ['base64', 'encode', 'decode', 'binary', 'text', 'url-safe'],
  tags: ['base64', 'encode'],
  component: Base64Component,
};

import { Hash } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { HashGeneratorComponent } from './component';

export const hashGeneratorPlugin: Plugin = {
  id: 'hash-generator',
  slug: 'hash-generator',
  name: 'Hash Generator',
  description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes',
  category: 'utilities',
  icon: Hash,
  keywords: ['hash', 'md5', 'sha1', 'sha256', 'sha512', 'checksum', 'digest', 'crypto'],
  tags: ['hash', 'crypto'],
  component: HashGeneratorComponent,
};

import { Fingerprint } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { UuidGeneratorComponent } from './component';

export const uuidGeneratorPlugin: Plugin = {
  id: 'uuid-generator',
  slug: 'uuid-generator',
  name: 'UUID / NanoID Generator',
  description: 'Generate UUIDs (v4) and NanoIDs with custom alphabets',
  category: 'generators',
  icon: Fingerprint,
  keywords: ['uuid', 'nanoid', 'unique id', 'random id', 'v4', 'identifier', 'generate'],
  tags: ['uuid', 'nanoid', 'generator'],
  component: UuidGeneratorComponent,
};

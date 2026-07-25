import { ArrowLeftRight } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { JsonYamlComponent } from './component';

export const jsonYamlPlugin: Plugin = {
  id: 'json-yaml',
  slug: 'json-yaml',
  name: 'JSON ↔ YAML',
  description: 'Convert between JSON and YAML formats',
  category: 'converters',
  icon: ArrowLeftRight,
  keywords: ['json', 'yaml', 'convert', 'transform', 'serialize'],
  tags: ['json', 'yaml', 'convert'],
  component: JsonYamlComponent,
};

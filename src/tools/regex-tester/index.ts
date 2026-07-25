import { Regex } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { RegexTesterComponent } from './component';

export const regexTesterPlugin: Plugin = {
  id: 'regex-tester',
  slug: 'regex-tester',
  name: 'Regex Tester',
  description: 'Test regular expressions with live match highlighting',
  category: 'testers',
  icon: Regex,
  keywords: ['regex', 'regular expression', 'test', 'match', 'pattern', 'flags', 'groups'],
  tags: ['regex', 'pattern', 'test'],
  component: RegexTesterComponent,
};

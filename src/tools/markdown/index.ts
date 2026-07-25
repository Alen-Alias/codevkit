import { FileText } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { MarkdownComponent } from './component';

export const markdownPlugin: Plugin = {
  id: 'markdown',
  slug: 'markdown',
  name: 'Markdown Editor',
  description: 'Write and preview Markdown with syntax highlighting',
  category: 'formatters',
  icon: FileText,
  keywords: ['markdown', 'preview', 'render', 'md', 'document', 'editor', 'html'],
  tags: ['markdown', 'editor', 'preview'],
  component: MarkdownComponent,
};

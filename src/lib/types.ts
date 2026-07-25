import { LucideIcon } from 'lucide-react';

export type Category = 'encode-decode' | 'formatters' | 'generators' | 'converters' | 'testers' | 'utilities';

export interface Plugin {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Category;
  icon: LucideIcon;
  keywords: string[];
  shortcut?: string;
  tags: string[];
  component: React.ComponentType;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'encode-decode': 'Encode / Decode',
  'formatters': 'Formatters',
  'generators': 'Generators',
  'converters': 'Converters',
  'testers': 'Testers',
  'utilities': 'Utilities',
};

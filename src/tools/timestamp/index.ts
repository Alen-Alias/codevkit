import { Clock } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { TimestampComponent } from './component';

export const timestampPlugin: Plugin = {
  id: 'timestamp',
  slug: 'timestamp',
  name: 'Unix Timestamp',
  description: 'Convert Unix timestamps to human-readable dates and back',
  category: 'converters',
  icon: Clock,
  keywords: ['unix', 'timestamp', 'epoch', 'date', 'time', 'utc', 'convert', 'iso'],
  tags: ['timestamp', 'date', 'time'],
  component: TimestampComponent,
};

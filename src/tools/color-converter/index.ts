import { Palette } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { ColorConverterComponent } from './component';

export const colorConverterPlugin: Plugin = {
  id: 'color-converter',
  slug: 'color-converter',
  name: 'Color Converter',
  description: 'Convert between HEX, RGB, HSL and check WCAG contrast',
  category: 'utilities',
  icon: Palette,
  keywords: ['color', 'hex', 'rgb', 'hsl', 'convert', 'contrast', 'accessibility', 'wcag', 'palette'],
  tags: ['color', 'css', 'design'],
  component: ColorConverterComponent,
};

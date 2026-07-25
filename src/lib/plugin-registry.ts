import { Plugin, Category, CATEGORY_LABELS } from './types';
import { jsonFormatterPlugin } from '@/tools/json-formatter/index';
import { jsonYamlPlugin } from '@/tools/json-yaml/index';
import { base64Plugin } from '@/tools/base64/index';
import { urlEncodePlugin } from '@/tools/url-encode/index';
import { hashGeneratorPlugin } from '@/tools/hash-generator/index';
import { jwtDecoderPlugin } from '@/tools/jwt-decoder/index';
import { regexTesterPlugin } from '@/tools/regex-tester/index';
import { uuidGeneratorPlugin } from '@/tools/uuid-generator/index';
import { timestampPlugin } from '@/tools/timestamp/index';
import { colorConverterPlugin } from '@/tools/color-converter/index';
import { markdownPlugin } from '@/tools/markdown/index';
import { curlConverterPlugin } from '@/tools/curl-converter/index';

export const plugins: Plugin[] = [
  jsonFormatterPlugin,
  jsonYamlPlugin,
  base64Plugin,
  urlEncodePlugin,
  hashGeneratorPlugin,
  jwtDecoderPlugin,
  regexTesterPlugin,
  uuidGeneratorPlugin,
  timestampPlugin,
  colorConverterPlugin,
  markdownPlugin,
  curlConverterPlugin,
];

export function getPlugin(slug: string): Plugin | undefined {
  return plugins.find((p) => p.slug === slug);
}

export function getPluginsByCategory(category: Category): Plugin[] {
  return plugins.filter((p) => p.category === category);
}

export const CATEGORIES: Category[] = [
  'formatters',
  'encode-decode',
  'generators',
  'converters',
  'testers',
  'utilities',
];

export { CATEGORY_LABELS };

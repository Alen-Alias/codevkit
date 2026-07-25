import { KeyRound } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { JwtDecoderComponent } from './component';

export const jwtDecoderPlugin: Plugin = {
  id: 'jwt-decoder',
  slug: 'jwt-decoder',
  name: 'JWT Decoder',
  description: 'Decode and inspect JSON Web Tokens',
  category: 'encode-decode',
  icon: KeyRound,
  keywords: ['jwt', 'json web token', 'decode', 'header', 'payload', 'claims', 'bearer', 'auth'],
  tags: ['jwt', 'token', 'auth'],
  component: JwtDecoderComponent,
};

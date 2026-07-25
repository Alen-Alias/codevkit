import chroma from 'chroma-js';

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  try {
    const [r, g, b] = chroma(hex).rgb();
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  } catch {
    return null;
  }
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  try {
    const [h, s, l] = chroma(hex).hsl();
    return { 
      h: Math.round(isNaN(h) ? 0 : h), 
      s: Math.round(s * 100), 
      l: Math.round(l * 100) 
    };
  } catch {
    return null;
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  try {
    return chroma(r, g, b).hex();
  } catch {
    return '#000000';
  }
}

export function hslToHex(h: number, s: number, l: number): string {
  try {
    return chroma.hsl(h, s / 100, l / 100).hex();
  } catch {
    return '#000000';
  }
}

export function getLuminance(hex: string): number {
  try {
    return chroma(hex).luminance();
  } catch {
    return 0;
  }
}

export function getContrastRatio(fg: string, bg: string): number {
  try {
    const fgLum = getLuminance(fg);
    const bgLum = getLuminance(bg);
    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);
    return (lighter + 0.05) / (darker + 0.05);
  } catch {
    return 1;
  }
}

export interface WCAGResult {
  ratio: number;
  aaLargeText: boolean;
  aaNormalText: boolean;
  aaaLargeText: boolean;
  aaaNormalText: boolean;
}

export function checkWCAG(fg: string, bg: string): WCAGResult {
  const ratio = getContrastRatio(fg, bg);
  return {
    ratio,
    aaLargeText: ratio >= 3,
    aaNormalText: ratio >= 4.5,
    aaaLargeText: ratio >= 4.5,
    aaaNormalText: ratio >= 7,
  };
}

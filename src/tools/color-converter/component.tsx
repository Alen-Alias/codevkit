import { useState, useEffect, useCallback } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { CopyButton } from '@/components/copy-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { hexToRgb, hexToHsl, rgbToHex, hslToHex, checkWCAG } from './utils';

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(v)));
}

export function ColorConverterComponent() {
  const [hex, setHex] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  // Contrast checker state
  const [fgColor, setFgColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#1e293b');

  const fromHex = useCallback((h: string) => {
    const r = hexToRgb(h);
    const s = hexToHsl(h);
    if (r) setRgb(r);
    if (s) setHsl(s);
  }, []);

  const handleHexChange = (value: string) => {
    setHex(value);
    if (/^#[0-9a-fA-F]{6}$/.test(value)) fromHex(value);
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', raw: string) => {
    const v = clamp(Number(raw) || 0, 0, 255);
    const next = { ...rgb, [channel]: v };
    setRgb(next);
    const h = rgbToHex(next.r, next.g, next.b);
    setHex(h);
    const s = hexToHsl(h);
    if (s) setHsl(s);
  };

  const handleHslChange = (channel: 'h' | 's' | 'l', raw: string) => {
    const max = channel === 'h' ? 360 : 100;
    const v = clamp(Number(raw) || 0, 0, max);
    const next = { ...hsl, [channel]: v };
    setHsl(next);
    const h = hslToHex(next.h, next.s, next.l);
    setHex(h);
    const r = hexToRgb(h);
    if (r) setRgb(r);
  };

  useEffect(() => { fromHex(hex); }, []); // eslint-disable-line

  const wcag = checkWCAG(fgColor, bgColor);

  const PassBadge = ({ pass }: { pass: boolean }) => (
    <Badge variant={pass ? 'default' : 'secondary'} className={pass ? 'bg-green-600 hover:bg-green-600' : ''}>
      {pass ? 'Pass' : 'Fail'}
    </Badge>
  );

  return (
    <ToolShell
      title="Color Converter"
      description="Convert between HEX, RGB, HSL and check WCAG contrast ratios"
    >
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Converter */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold">Color Converter</h3>

          {/* Swatch + picker */}
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-xl border border-border shadow-md shrink-0"
              style={{ backgroundColor: hex }}
            />
            <div className="space-y-2 flex-1">
              <input
                type="color"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="w-full h-10 cursor-pointer rounded-md border border-input bg-transparent"
              />
              <p className="text-xs text-muted-foreground">Click to open color picker</p>
            </div>
          </div>

          {/* HEX */}
          <div className="space-y-1.5">
            <Label className="text-sm">HEX</Label>
            <div className="flex items-center gap-2">
              <Input
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="font-mono uppercase"
                maxLength={7}
              />
              <CopyButton text={hex} />
            </div>
          </div>

          {/* RGB */}
          <div className="space-y-1.5">
            <Label className="text-sm">RGB</Label>
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-3 gap-2 flex-1">
                {(['r', 'g', 'b'] as const).map((ch) => (
                  <div key={ch} className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase">{ch}</span>
                    <Input
                      type="number"
                      min={0} max={255}
                      value={rgb[ch]}
                      onChange={(e) => handleRgbChange(ch, e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                ))}
              </div>
              <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            </div>
          </div>

          {/* HSL */}
          <div className="space-y-1.5">
            <Label className="text-sm">HSL</Label>
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-3 gap-2 flex-1">
                {([
                  { ch: 'h', label: 'H', max: 360 },
                  { ch: 's', label: 'S%', max: 100 },
                  { ch: 'l', label: 'L%', max: 100 },
                ] as const).map(({ ch, label }) => (
                  <div key={ch} className="space-y-1">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <Input
                      type="number"
                      min={0}
                      value={hsl[ch]}
                      onChange={(e) => handleHslChange(ch, e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                ))}
              </div>
              <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
            </div>
          </div>
        </div>

        <Separator className="lg:hidden" />

        {/* Contrast Checker */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold">Contrast Checker</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Foreground</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-9 h-9 cursor-pointer rounded border border-input"
                />
                <Input
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="font-mono text-sm uppercase"
                  maxLength={7}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Background</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-9 h-9 cursor-pointer rounded border border-input"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="font-mono text-sm uppercase"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div
            className="rounded-lg p-5 border border-border"
            style={{ backgroundColor: bgColor }}
          >
            <p className="text-xl font-semibold" style={{ color: fgColor }}>
              Sample Text
            </p>
            <p className="text-sm mt-1" style={{ color: fgColor }}>
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          {/* Ratio */}
          <div className="text-center">
            <div className="font-mono text-4xl font-bold">{wcag.ratio.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground mt-1">Contrast ratio</div>
          </div>

          {/* WCAG results */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Level</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Normal Text</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Large Text</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium">AA</td>
                  <td className="px-4 py-3"><PassBadge pass={wcag.aaNormalText} /></td>
                  <td className="px-4 py-3"><PassBadge pass={wcag.aaLargeText} /></td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium">AAA</td>
                  <td className="px-4 py-3"><PassBadge pass={wcag.aaaNormalText} /></td>
                  <td className="px-4 py-3"><PassBadge pass={wcag.aaaLargeText} /></td>
                </tr>
              </tbody>
            </table>
            <div className="px-4 py-2 border-t border-border bg-muted/50">
              <p className="text-xs text-muted-foreground">
                AA requires 4.5:1 (normal), 3:1 (large) · AAA requires 7:1 (normal), 4.5:1 (large)
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

import { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { SplitPane } from '@/components/split-pane';
import { CopyButton } from '@/components/copy-button';
import { ErrorInline } from '@/components/error-inline';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { encodeUrl, decodeUrl, EncodeType } from './utils';

export function UrlEncodeComponent() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeType, setEncodeType] = useState<EncodeType>('component');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    const result = mode === 'encode' ? encodeUrl(input, encodeType) : decodeUrl(input);
    if (result.success && result.result) {
      setOutput(result.result);
      setError(null);
    } else {
      setOutput('');
      setError(result.error || 'Unknown error');
    }
  }, [input, mode, encodeType]);

  return (
    <ToolShell
      title="URL Encoder/Decoder"
      description="Encode and decode URLs"
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => setInput('')}>Clear</Button>
          {output && <CopyButton text={output} />}
        </>
      }
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-6">
          <RadioGroup value={mode} onValueChange={(v) => setMode(v as any)}>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="encode" id="encode" />
                <Label htmlFor="encode">Encode</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="decode" id="decode" />
                <Label htmlFor="decode">Decode</Label>
              </div>
            </div>
          </RadioGroup>

          {mode === 'encode' && (
            <RadioGroup value={encodeType} onValueChange={(v) => setEncodeType(v as EncodeType)}>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="uri" id="uri" />
                  <Label htmlFor="uri" className="text-sm">encodeURI</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="component" id="component" />
                  <Label htmlFor="component" className="text-sm">encodeURIComponent</Label>
                </div>
              </div>
            </RadioGroup>
          )}
        </div>

        <SplitPane>
          <div className="space-y-2">
            <label className="text-sm font-medium">Input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[400px] font-mono text-sm resize-none"
              placeholder="Enter URL..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            {error ? (
              <ErrorInline message={error} />
            ) : (
              <Textarea value={output} readOnly className="min-h-[400px] font-mono text-sm resize-none bg-muted" />
            )}
          </div>
        </SplitPane>
      </div>
    </ToolShell>
  );
}

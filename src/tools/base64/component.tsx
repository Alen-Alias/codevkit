import { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { SplitPane } from '@/components/split-pane';
import { CopyButton } from '@/components/copy-button';
import { ErrorInline } from '@/components/error-inline';
import { ExampleChip } from '@/components/example-chip';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { encodeBase64, decodeBase64 } from './utils';

const EXAMPLE_ENCODE = 'Hello, World! This is a test string for Base64 encoding.';
const EXAMPLE_DECODE = 'SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgdGVzdCBzdHJpbmcgZm9yIEJhc2U2NCBlbmNvZGluZy4=';

type Mode = 'encode' | 'decode';

export function Base64Component() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('encode');
  const [urlSafe, setUrlSafe] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = mode === 'encode' 
        ? encodeBase64(input, urlSafe)
        : decodeBase64(input, urlSafe);

      if (result.success && result.result) {
        setOutput(result.result);
        setError(null);
      } else {
        setOutput('');
        setError(result.error || 'Unknown error');
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [input, mode, urlSafe]);

  const handleSwap = () => {
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const handleExample = () => {
    setInput(mode === 'encode' ? EXAMPLE_ENCODE : EXAMPLE_DECODE);
  };

  return (
    <ToolShell
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings"
      actions={
        <>
          <Button variant="outline" size="sm" onClick={handleSwap}>Swap</Button>
          <Button variant="outline" size="sm" onClick={() => setInput('')}>Clear</Button>
          {output && <CopyButton text={output} />}
        </>
      }
    >
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList>
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Switch id="url-safe" checked={urlSafe} onCheckedChange={setUrlSafe} />
            <Label htmlFor="url-safe" className="text-sm cursor-pointer">URL-safe</Label>
          </div>
        </div>

        <SplitPane>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Input</label>
              {!input && <ExampleChip onClick={handleExample} />}
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] sm:min-h-[400px] font-mono text-sm resize-none"
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            {error ? (
              <ErrorInline message={error} />
            ) : (
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px] sm:min-h-[400px] font-mono text-sm resize-none bg-muted"
              />
            )}
          </div>
        </SplitPane>
      </div>
    </ToolShell>
  );
}

import { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { CopyButton } from '@/components/copy-button';
import { ExampleChip } from '@/components/example-chip';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { generateHashes } from './utils';

const EXAMPLE = 'Hello, World!';

export function HashGeneratorComponent() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({ md5: '', sha1: '', sha256: '', sha512: '' });
  const [uppercase, setUppercase] = useState(false);

  useEffect(() => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    const timer = setTimeout(async () => {
      const result = await generateHashes(input);
      setHashes(result);
    }, 150);

    return () => clearTimeout(timer);
  }, [input]);

  const formatHash = (hash: string) => uppercase ? hash.toUpperCase() : hash;

  return (
    <ToolShell
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes"
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => setUppercase(!uppercase)}>
            {uppercase ? 'Lowercase' : 'Uppercase'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput('')}>Clear</Button>
        </>
      }
    >
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Input</label>
            {!input && <ExampleChip onClick={() => setInput(EXAMPLE)} />}
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px] font-mono text-sm resize-none"
            placeholder="Enter text to hash..."
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Hashes</h3>
          <div className="text-xs text-muted-foreground">
            MD5 and SHA-1 are not cryptographically secure and should not be used for security purposes.
          </div>
          
          {[
            { label: 'MD5', value: hashes.md5 },
            { label: 'SHA-1', value: hashes.sha1 },
            { label: 'SHA-256', value: hashes.sha256 },
            { label: 'SHA-512', value: hashes.sha512 },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-muted rounded-md">
              <div className="w-20 text-sm font-medium">{label}</div>
              <div className="flex-1 font-mono text-xs break-all">{formatHash(value)}</div>
              {value && <CopyButton text={formatHash(value)} />}
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}

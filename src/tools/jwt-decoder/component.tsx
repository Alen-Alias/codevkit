import { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { CopyButton } from '@/components/copy-button';
import { ErrorInline } from '@/components/error-inline';
import { ExampleChip } from '@/components/example-chip';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { decodeJwtToken } from './utils';

const EXAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggUml2ZXJhIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function JsonDisplay({ data }: { data: Record<string, unknown> }) {
  const formatted = JSON.stringify(data, null, 2);
  return (
    <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-all p-4 rounded-md bg-background border border-border overflow-auto">
      {formatted}
    </pre>
  );
}

export function JwtDecoderComponent() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<ReturnType<typeof decodeJwtToken>['data']>(undefined);

  useEffect(() => {
    if (!input.trim()) {
      setDecoded(undefined);
      setError(null);
      return;
    }
    const timer = setTimeout(() => {
      const result = decodeJwtToken(input.trim());
      if (result.success && result.data) {
        setDecoded(result.data);
        setError(null);
      } else {
        setDecoded(undefined);
        setError(result.error ?? 'Unknown error');
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <ToolShell
      title="JWT Decoder"
      description="Decode and inspect JSON Web Tokens — no verification, client-side only"
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => setInput('')}>Clear</Button>
        </>
      }
    >
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">JWT Token</label>
            {!input && <ExampleChip onClick={() => setInput(EXAMPLE_JWT)} />}
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[100px] font-mono text-xs resize-none"
            placeholder="Paste a JWT token here..."
          />
        </div>

        {error && <ErrorInline message={error} />}

        {decoded && (
          <div className="space-y-4">
            {/* Header */}
            <div className="rounded-lg border border-blue-500/30 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-blue-500/10 border-b border-blue-500/20">
                <span className="text-sm font-semibold text-blue-400">Header</span>
                <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
              </div>
              <div className="p-0">
                <JsonDisplay data={decoded.header} />
              </div>
            </div>

            {/* Payload */}
            <div className="rounded-lg border border-green-500/30 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-green-500/10 border-b border-green-500/20">
                <span className="text-sm font-semibold text-green-400">Payload</span>
                <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
              </div>
              <div className="p-0">
                <JsonDisplay data={decoded.payload} />
              </div>
              {(decoded.expiresAt || decoded.issuedAt) && (
                <div className="px-4 py-3 border-t border-green-500/20 bg-green-500/5 flex flex-wrap gap-4 text-xs">
                  {decoded.issuedAt && (
                    <span className="text-muted-foreground">
                      Issued: <span className="text-foreground font-mono">{decoded.issuedAt.toLocaleString()}</span>
                    </span>
                  )}
                  {decoded.expiresAt && (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      Expires: <span className="font-mono text-foreground">{decoded.expiresAt.toLocaleString()}</span>
                      <Badge variant={decoded.isExpired ? 'destructive' : 'default'} className="text-xs">
                        {decoded.isExpired ? 'Expired' : 'Valid'}
                      </Badge>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Signature */}
            <div className="rounded-lg border border-orange-500/30 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-orange-500/10 border-b border-orange-500/20">
                <span className="text-sm font-semibold text-orange-400">Signature</span>
                <CopyButton text={decoded.signature} />
              </div>
              <div className="p-4">
                <p className="font-mono text-xs break-all text-muted-foreground">{decoded.signature}</p>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Signature is not verified — this tool decodes only.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

import { useState, useMemo } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { CopyButton } from '@/components/copy-button';
import { ErrorInline } from '@/components/error-inline';
import { ExampleChip } from '@/components/example-chip';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { parseCurl, generateFetch, generatePython, generateAxios } from './utils';

const EXAMPLE_CURL = `curl -X POST https://api.example.com/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer my-token-here" \\
  -d '{"name": "Alex Rivera", "email": "alex@example.com"}'`;

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative">
      <pre className="font-mono text-sm leading-relaxed p-4 bg-muted rounded-lg overflow-auto whitespace-pre-wrap break-all border border-border min-h-[200px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function CurlConverterComponent() {
  const [input, setInput] = useState('');

  const parsed = useMemo(() => {
    if (!input.trim()) return null;
    return parseCurl(input.trim());
  }, [input]);

  const fetchCode = useMemo(() => parsed ? generateFetch(parsed) : '', [parsed]);
  const pythonCode = useMemo(() => parsed ? generatePython(parsed) : '', [parsed]);
  const axiosCode = useMemo(() => parsed ? generateAxios(parsed) : '', [parsed]);

  const showError = input.trim() && !parsed;

  return (
    <ToolShell
      title="cURL Converter"
      description="Convert cURL commands to JavaScript fetch, Python requests, and Axios"
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => setInput('')}>Clear</Button>
        </>
      }
    >
      <div className="p-4 sm:p-6 space-y-6">
        {/* cURL input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">cURL Command</label>
            {!input && <ExampleChip onClick={() => setInput(EXAMPLE_CURL)} />}
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] font-mono text-sm resize-none"
            placeholder="curl https://api.example.com/endpoint -H 'Authorization: Bearer token'"
            spellCheck={false}
          />
        </div>

        {showError && (
          <ErrorInline message="Could not parse cURL command. Make sure it starts with 'curl' and includes a URL." />
        )}

        {parsed && (
          <>
            {/* Parsed summary */}
            <div className="flex items-center gap-3 flex-wrap text-sm">
              <span className={`font-mono font-semibold px-2 py-0.5 rounded text-xs shrink-0 ${
                parsed.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                parsed.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                parsed.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                'bg-orange-500/20 text-orange-400'
              }`}>
                {parsed.method}
              </span>
              <span className="font-mono text-muted-foreground text-xs truncate max-w-[200px] sm:max-w-xs">{parsed.url}</span>
              {Object.keys(parsed.headers).length > 0 && (
                <span className="text-xs text-muted-foreground">{Object.keys(parsed.headers).length} header(s)</span>
              )}
              {parsed.body && <span className="text-xs text-muted-foreground">has body</span>}
            </div>

            {/* Output tabs */}
            <Tabs defaultValue="fetch">
              <TabsList>
                <TabsTrigger value="fetch">JavaScript (fetch)</TabsTrigger>
                <TabsTrigger value="python">Python (requests)</TabsTrigger>
                <TabsTrigger value="axios">Node.js (axios)</TabsTrigger>
              </TabsList>

              <TabsContent value="fetch" className="mt-4">
                <div className="flex justify-end mb-2">
                  <CopyButton text={fetchCode} />
                </div>
                <CodeBlock code={fetchCode} />
              </TabsContent>

              <TabsContent value="python" className="mt-4">
                <div className="flex justify-end mb-2">
                  <CopyButton text={pythonCode} />
                </div>
                <CodeBlock code={pythonCode} />
              </TabsContent>

              <TabsContent value="axios" className="mt-4">
                <div className="flex justify-end mb-2">
                  <CopyButton text={axiosCode} />
                </div>
                <CodeBlock code={axiosCode} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </ToolShell>
  );
}

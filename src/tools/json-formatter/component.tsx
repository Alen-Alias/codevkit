import { useState, useEffect, useMemo } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { SplitPane } from '@/components/split-pane';
import { CopyButton } from '@/components/copy-button';
import { ErrorInline } from '@/components/error-inline';
import { ExampleChip } from '@/components/example-chip';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatJson, minifyJson } from './utils';
import { useLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from 'next-themes';

const EXAMPLE = `{
  "user": {
    "id": 1047,
    "name": "Alex Rivera",
    "email": "alex.rivera@example.com",
    "address": {
      "street": "42 Developer Lane",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94102"
    },
    "hobbies": ["coding", "rock climbing", "photography"],
    "active": true
  }
}`;

type Mode = 'format' | 'minify';

export function JsonFormatterComponent() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('format');
  const [indent, setIndent] = useLocalStorage<number | 'tab'>(STORAGE_KEYS.JSON_INDENT, 2);
  const { resolvedTheme } = useTheme();

  const indentValue = useMemo(() => {
    if (typeof indent === 'number') return indent;
    return indent === 'tab' ? 'tab' : 2;
  }, [indent]);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = mode === 'format' 
        ? formatJson(input, indentValue as number | 'tab')
        : minifyJson(input);

      if (result.valid && result.result) {
        setOutput(result.result);
        setError(null);
      } else {
        setOutput('');
        setError(result.error || 'Unknown error');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, mode, indentValue]);

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleExample = () => {
    setInput(EXAMPLE);
  };

  return (
    <ToolShell
      title="JSON Formatter"
      description="Format, minify, and validate JSON"
      shortcut="J"
      actions={
        <>
          <Button variant="outline" size="sm" onClick={handleClear}>Clear</Button>
          {output && <CopyButton text={output} />}
        </>
      }
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList>
              <TabsTrigger value="format">Format</TabsTrigger>
              <TabsTrigger value="minify">Minify</TabsTrigger>
            </TabsList>
          </Tabs>

          {mode === 'format' && (
            <Select
              value={String(indentValue)}
              onValueChange={(v) => setIndent(v === 'tab' ? 'tab' : Number(v))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 spaces</SelectItem>
                <SelectItem value="4">4 spaces</SelectItem>
                <SelectItem value="tab">Tab</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <SplitPane>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Input</label>
              {!input && <ExampleChip onClick={handleExample} />}
            </div>
            <CodeMirror
              value={input}
              onChange={setInput}
              height="500px"
              extensions={[json()]}
              theme={resolvedTheme === 'dark' ? oneDark : undefined}
              className="border border-input rounded-md overflow-hidden font-mono text-sm [&_.cm-editor]:bg-background [&_.cm-editor]:text-foreground"
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            {error ? (
              <ErrorInline message={error} />
            ) : (
              <CodeMirror
                value={output}
                readOnly
                height="500px"
                extensions={[json()]}
                theme={resolvedTheme === 'dark' ? oneDark : undefined}
                className="border border-input rounded-md overflow-hidden font-mono text-sm [&_.cm-editor]:bg-background [&_.cm-editor]:text-foreground"
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                }}
              />
            )}
          </div>
        </SplitPane>
      </div>
    </ToolShell>
  );
}

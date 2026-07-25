import { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { SplitPane } from '@/components/split-pane';
import { CopyButton } from '@/components/copy-button';
import { ErrorInline } from '@/components/error-inline';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeftRight } from 'lucide-react';
import { jsonToYaml, yamlToJson } from './utils';

export function JsonYamlComponent() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<'json-to-yaml' | 'yaml-to-json'>('json-to-yaml');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = direction === 'json-to-yaml' ? jsonToYaml(input) : yamlToJson(input);
      if (result.success && result.result) {
        setOutput(result.result);
        setError(null);
      } else {
        setOutput('');
        setError(result.error || 'Unknown error');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, direction]);

  const toggleDirection = () => {
    setDirection(d => d === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml');
    setInput(output);
  };

  return (
    <ToolShell
      title="JSON ↔ YAML Converter"
      description="Convert between JSON and YAML formats"
      shortcut="T"
      actions={
        <>
          <Button variant="outline" size="sm" onClick={toggleDirection}>
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            {direction === 'json-to-yaml' ? 'JSON → YAML' : 'YAML → JSON'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput('')}>Clear</Button>
          {output && <CopyButton text={output} />}
        </>
      }
    >
      <div className="p-4 sm:p-6">
        <SplitPane>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {direction === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] sm:min-h-[500px] font-mono text-sm resize-none"
              placeholder={`Enter ${direction === 'json-to-yaml' ? 'JSON' : 'YAML'}...`}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {direction === 'json-to-yaml' ? 'YAML Output' : 'JSON Output'}
            </label>
            {error ? (
              <ErrorInline message={error} />
            ) : (
              <Textarea
                value={output}
                readOnly
                className="min-h-[200px] sm:min-h-[500px] font-mono text-sm resize-none bg-muted"
              />
            )}
          </div>
        </SplitPane>
      </div>
    </ToolShell>
  );
}

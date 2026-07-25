import { useState, useMemo } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { ErrorInline } from '@/components/error-inline';
import { ExampleChip } from '@/components/example-chip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { testRegex } from './utils';

const EXAMPLE_PATTERN = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
const EXAMPLE_FLAGS = 'g';
const EXAMPLE_STRING = `Reach us at support@example.com or sales@company.io.
Invalid: not-an-email, @nodomain, missing@
Also valid: user.name+tag@sub.domain.org`;

type Flag = 'g' | 'i' | 'm' | 's' | 'u';
const ALL_FLAGS: Flag[] = ['g', 'i', 'm', 's', 'u'];

export function RegexTesterComponent() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState<Set<Flag>>(new Set(['g']));
  const [testString, setTestString] = useState('');

  const flagsStr = Array.from(flags).join('');

  const result = useMemo(() => {
    if (!pattern || !testString) return null;
    return testRegex(pattern, flagsStr, testString);
  }, [pattern, flagsStr, testString]);

  const toggleFlag = (flag: Flag) => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) next.delete(flag);
      else next.add(flag);
      return next;
    });
  };

  const handleExample = () => {
    setPattern(EXAMPLE_PATTERN);
    setFlags(new Set([EXAMPLE_FLAGS as Flag]));
    setTestString(EXAMPLE_STRING);
  };

  // Build highlighted segments
  const highlightedSegments = useMemo(() => {
    if (!result?.valid || !result.matches?.length || !testString) return null;
    const matches = result.matches;
    const segments: Array<{ text: string; highlighted: boolean }> = [];
    let lastIndex = 0;

    for (const match of matches) {
      if (match.index > lastIndex) {
        segments.push({ text: testString.slice(lastIndex, match.index), highlighted: false });
      }
      segments.push({ text: match.value, highlighted: true });
      lastIndex = match.index + match.value.length;
    }
    if (lastIndex < testString.length) {
      segments.push({ text: testString.slice(lastIndex), highlighted: false });
    }
    return segments;
  }, [result, testString]);

  return (
    <ToolShell
      title="Regex Tester"
      description="Test regular expressions with live match highlighting"
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setPattern(''); setTestString(''); setFlags(new Set(['g'])); }}
          >
            Clear
          </Button>
        </>
      }
    >
      <div className="p-6 space-y-5">
        {/* Pattern + flags */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Pattern</label>
            {!pattern && !testString && <ExampleChip onClick={handleExample} />}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">/</span>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="font-mono pl-6 pr-6"
                placeholder="[a-z]+"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">/{flagsStr}</span>
            </div>
            <div className="flex items-center gap-1">
              {ALL_FLAGS.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFlag(f)}
                  className={`w-7 h-7 text-xs font-mono rounded border transition-colors ${
                    flags.has(f)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {result && !result.valid && result.error && (
            <ErrorInline message={result.error} />
          )}
        </div>

        {/* Match count */}
        {result?.valid && (
          <div className="flex items-center gap-2">
            <Badge variant={result.matches && result.matches.length > 0 ? 'default' : 'secondary'}>
              {result.matches?.length ?? 0} {result.matches?.length === 1 ? 'match' : 'matches'}
            </Badge>
          </div>
        )}

        {/* Test string */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Test String</label>
          {!highlightedSegments ? (
            <Textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[200px] font-mono text-sm resize-none"
              placeholder="Enter text to test against..."
            />
          ) : (
            <div className="min-h-[200px] font-mono text-sm p-3 border border-input rounded-md bg-background whitespace-pre-wrap break-words leading-relaxed">
              {highlightedSegments.map((seg, i) =>
                seg.highlighted ? (
                  <mark key={i} className="bg-primary/30 text-foreground rounded-sm px-0.5">
                    {seg.text}
                  </mark>
                ) : (
                  <span key={i}>{seg.text}</span>
                )
              )}
            </div>
          )}
        </div>

        {/* Match list */}
        {result?.valid && result.matches && result.matches.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Matches</label>
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground w-10">#</th>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground w-16">Index</th>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground">Value</th>
                    <th className="text-left px-3 py-2 font-medium text-muted-foreground">Groups</th>
                  </tr>
                </thead>
                <tbody>
                  {result.matches.map((match, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/50">
                      <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                      <td className="px-3 py-2 font-mono text-muted-foreground">{match.index}</td>
                      <td className="px-3 py-2 font-mono text-primary">{match.value}</td>
                      <td className="px-3 py-2 font-mono text-muted-foreground">
                        {match.groups.length > 0 ? match.groups.join(', ') : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

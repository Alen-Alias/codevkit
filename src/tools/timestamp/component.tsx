import { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tool-shell';
import { CopyButton } from '@/components/copy-button';
import { ErrorInline } from '@/components/error-inline';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { timestampToDate, dateToTimestamp } from './utils';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground w-28 shrink-0">{label}</span>
      <span className="flex-1 font-mono text-sm break-all">{value}</span>
      <CopyButton text={value} />
    </div>
  );
}

export function TimestampComponent() {
  const [now, setNow] = useState(() => Date.now());
  const [tsInput, setTsInput] = useState('');
  const [tsError, setTsError] = useState<string | null>(null);
  const [tsResult, setTsResult] = useState<ReturnType<typeof timestampToDate> | null>(null);
  const [isMs, setIsMs] = useState(false);

  const [dateInput, setDateInput] = useState('');
  const [dateResult, setDateResult] = useState<ReturnType<typeof dateToTimestamp> | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Timestamp → date
  useEffect(() => {
    if (!tsInput.trim()) {
      setTsResult(null);
      setTsError(null);
      return;
    }
    const num = Number(tsInput.trim());
    if (isNaN(num)) {
      setTsError('Invalid number');
      setTsResult(null);
      return;
    }
    setTsError(null);
    setTsResult(timestampToDate(num, isMs));
  }, [tsInput, isMs]);

  // Date → timestamp
  useEffect(() => {
    if (!dateInput.trim()) {
      setDateResult(null);
      setDateError(null);
      return;
    }
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      setDateError('Invalid date');
      setDateResult(null);
      return;
    }
    setDateError(null);
    setDateResult(dateToTimestamp(d));
  }, [dateInput]);

  return (
    <ToolShell
      title="Unix Timestamp"
      description="Convert between Unix timestamps and human-readable dates"
    >
      <div className="p-6 space-y-8 max-w-2xl">
        {/* Live clock */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Current Time</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Seconds</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-medium">{Math.floor(now / 1000)}</span>
                <CopyButton text={String(Math.floor(now / 1000))} />
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Milliseconds</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-medium">{now}</span>
                <CopyButton text={String(now)} />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Timestamp → Date */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Timestamp → Date</h3>
          <div className="flex items-center gap-4">
            <Input
              value={tsInput}
              onChange={(e) => setTsInput(e.target.value)}
              className="font-mono"
              placeholder="e.g. 1700000000"
            />
            <div className="flex items-center gap-2 shrink-0">
              <Switch id="is-ms" checked={isMs} onCheckedChange={setIsMs} />
              <Label htmlFor="is-ms" className="text-sm cursor-pointer whitespace-nowrap">Milliseconds</Label>
            </div>
            <Button variant="outline" size="sm" onClick={() => setTsInput(String(Math.floor(now / 1000)))}>
              Use now
            </Button>
          </div>
          {tsError && <ErrorInline message={tsError} />}
          {tsResult && (
            <div className="bg-muted rounded-lg px-4">
              <Row label="UTC" value={tsResult.utc} />
              <Row label="Local" value={tsResult.local} />
              <Row label="ISO 8601" value={tsResult.iso} />
              <Row label="Relative" value={tsResult.relative} />
            </div>
          )}
        </div>

        <Separator />

        {/* Date → Timestamp */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">Date → Timestamp</h3>
          <Input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="font-mono"
          />
          {dateError && <ErrorInline message={dateError} />}
          {dateResult && (
            <div className="bg-muted rounded-lg px-4">
              <Row label="Seconds" value={String(dateResult.seconds)} />
              <Row label="Milliseconds" value={String(dateResult.milliseconds)} />
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}

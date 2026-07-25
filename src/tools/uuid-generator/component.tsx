import { useState, useCallback } from 'react';
import { RefreshCw, Copy } from 'lucide-react';
import { ToolShell } from '@/components/tool-shell';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { generateUUIDs, generateNanoIDs } from './utils';
import { useToast } from '@/hooks/use-toast';

export function UuidGeneratorComponent() {
  const { toast } = useToast();

  // UUID state
  const [uuidCount, setUuidCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>(() => generateUUIDs(5));
  const [uuidUppercase, setUuidUppercase] = useState(false);

  // NanoID state
  const [nanoCount, setNanoCount] = useState(5);
  const [nanoLength, setNanoLength] = useState(21);
  const [nanoAlphabet, setNanoAlphabet] = useState('');
  const [nanoIds, setNanoIds] = useState<string[]>(() => generateNanoIDs(5, 21));

  const regenerateUuids = useCallback(() => {
    setUuids(generateUUIDs(uuidCount));
  }, [uuidCount]);

  const regenerateNanoIds = useCallback(() => {
    setNanoIds(generateNanoIDs(nanoCount, nanoLength, nanoAlphabet || undefined));
  }, [nanoCount, nanoLength, nanoAlphabet]);

  const copyAll = (items: string[]) => {
    navigator.clipboard.writeText(items.join('\n'));
    toast({ title: 'Copied', description: `${items.length} IDs copied to clipboard.` });
  };

  const formatUuid = (id: string) => (uuidUppercase ? id.toUpperCase() : id);

  return (
    <ToolShell
      title="UUID / NanoID Generator"
      description="Generate cryptographically random unique identifiers"
    >
      <div className="p-4 sm:p-6">
        <Tabs defaultValue="uuid">
          <TabsList className="mb-6">
            <TabsTrigger value="uuid">UUID v4</TabsTrigger>
            <TabsTrigger value="nanoid">NanoID</TabsTrigger>
          </TabsList>

          {/* UUID Tab */}
          <TabsContent value="uuid" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <Label className="text-sm whitespace-nowrap">Count: {uuidCount}</Label>
                <Slider
                  value={[uuidCount]}
                  onValueChange={([v]) => { setUuidCount(v); setUuids(generateUUIDs(v)); }}
                  min={1} max={20} step={1}
                  className="w-36"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="uppercase" checked={uuidUppercase} onCheckedChange={setUuidUppercase} />
                <Label htmlFor="uppercase" className="text-sm cursor-pointer">Uppercase</Label>
              </div>
              <div className="flex items-center gap-2 sm:ml-auto">
                <Button variant="outline" size="sm" onClick={() => copyAll(uuids.map(formatUuid))} className="gap-2">
                  <Copy className="w-3.5 h-3.5" />
                  Copy all
                </Button>
                <Button variant="outline" size="sm" onClick={regenerateUuids} className="gap-2">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              {uuids.map((id, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 bg-muted rounded-md group">
                  <span className="flex-1 font-mono text-sm tracking-wide">{formatUuid(id)}</span>
                  <CopyButton text={formatUuid(id)} />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* NanoID Tab */}
          <TabsContent value="nanoid" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Count: {nanoCount}</Label>
                <Slider
                  value={[nanoCount]}
                  onValueChange={([v]) => { setNanoCount(v); setNanoIds(generateNanoIDs(v, nanoLength, nanoAlphabet || undefined)); }}
                  min={1} max={20} step={1}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Length: {nanoLength}</Label>
                <Slider
                  value={[nanoLength]}
                  onValueChange={([v]) => { setNanoLength(v); setNanoIds(generateNanoIDs(nanoCount, v, nanoAlphabet || undefined)); }}
                  min={4} max={128} step={1}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-sm">Custom alphabet (leave blank for default)</Label>
                <Input
                  value={nanoAlphabet}
                  onChange={(e) => setNanoAlphabet(e.target.value)}
                  className="font-mono text-sm"
                  placeholder="A-Za-z0-9_- (default)"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => copyAll(nanoIds)} className="gap-2">
                <Copy className="w-3.5 h-3.5" />
                Copy all
              </Button>
              <Button variant="outline" size="sm" onClick={regenerateNanoIds} className="gap-2">
                <RefreshCw className="w-3.5 h-3.5" />
                Generate
              </Button>
            </div>

            <div className="space-y-1.5">
              {nanoIds.map((id, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 bg-muted rounded-md">
                  <span className="flex-1 font-mono text-sm tracking-wide">{id}</span>
                  <CopyButton text={id} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ToolShell>
  );
}

import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import Fuse from 'fuse.js';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useCommandPalette } from '@/contexts/command-palette-context';
import { plugins, CATEGORY_LABELS } from '@/lib/plugin-registry';
import type { Category, Plugin } from '@/lib/types';

export function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const [, navigate] = useLocation();
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(plugins, {
        keys: ['name', 'description', 'keywords', 'tags'],
        threshold: 0.3,
        includeScore: true,
      }),
    []
  );

  const results = useMemo(() => {
    if (!query.trim()) return plugins;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse]);

  const grouped = useMemo(() => {
    const map = new Map<Category, Plugin[]>();
    for (const plugin of results) {
      const list = map.get(plugin.category) ?? [];
      list.push(plugin);
      map.set(plugin.category, list);
    }
    return map;
  }, [results]);

  const handleSelect = (slug: string) => {
    close();
    setQuery('');
    navigate(`/tools/${slug}`);
  };

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="p-0 gap-0 max-w-xl overflow-hidden"
        aria-describedby={undefined}
      >
        <Command className="rounded-lg" shouldFilter={false}>
          <CommandInput
            placeholder="Search tools..."
            value={query}
            onValueChange={setQuery}
            className="h-12 text-sm"
          />
          <CommandList className="max-h-96">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No tools found for "{query}"
            </CommandEmpty>
            {Array.from(grouped.entries()).map(([category, categoryPlugins]) => (
              <CommandGroup key={category} heading={CATEGORY_LABELS[category]}>
                {categoryPlugins.map((plugin) => {
                  const Icon = plugin.icon;
                  return (
                    <CommandItem
                      key={plugin.id}
                      value={plugin.slug}
                      onSelect={() => handleSelect(plugin.slug)}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{plugin.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{plugin.description}</div>
                      </div>
                      {plugin.shortcut && (
                        <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                          {plugin.shortcut}
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Kbd } from './kbd';

interface Shortcut {
  keys: string[];
  description: string;
}

const GLOBAL_SHORTCUTS: Shortcut[] = [
  { keys: ['Ctrl', 'K'], description: 'Open command palette' },
  { keys: ['?'], description: 'Show keyboard shortcuts' },
  { keys: ['Escape'], description: 'Close modal / palette' },
];

export function ShortcutsOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Global
          </div>
          {GLOBAL_SHORTCUTS.map((shortcut) => (
            <div key={shortcut.description} className="flex items-center justify-between py-1.5">
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <Kbd>{key}</Kbd>
                    {i < shortcut.keys.length - 1 && (
                      <span className="text-muted-foreground text-xs">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <Separator className="my-3" />
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Navigation
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-muted-foreground">Go to any tool</span>
            <div className="flex items-center gap-1">
              <Kbd>Ctrl</Kbd>
              <span className="text-muted-foreground text-xs">+</span>
              <Kbd>K</Kbd>
              <span className="text-muted-foreground text-xs ml-1">then search</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

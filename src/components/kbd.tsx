import { cn } from '@/lib/utils';

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center px-2 py-0.5 text-xs font-mono',
        'bg-muted text-muted-foreground border border-border rounded',
        'shadow-sm',
        className
      )}
    >
      {children}
    </kbd>
  );
}

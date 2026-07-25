import { cn } from '@/lib/utils';

interface SplitPaneProps {
  children: [React.ReactNode, React.ReactNode];
  className?: string;
}

export function SplitPane({ children, className }: SplitPaneProps) {
  return (
    <div className={cn('grid md:grid-cols-2 gap-4', className)}>
      {children}
    </div>
  );
}

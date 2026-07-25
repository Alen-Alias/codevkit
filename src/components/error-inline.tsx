import { AlertCircle } from 'lucide-react';

interface ErrorInlineProps {
  message: string;
}

export function ErrorInline({ message }: ErrorInlineProps) {
  return (
    <div className="flex items-start gap-2 p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm">
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  valid: boolean;
}

export function StatusBadge({ valid }: StatusBadgeProps) {
  return (
    <Badge
      variant={valid ? 'default' : 'destructive'}
      className="gap-1"
    >
      {valid ? (
        <>
          <Check className="w-3 h-3" />
          Valid
        </>
      ) : (
        <>
          <X className="w-3 h-3" />
          Invalid
        </>
      )}
    </Badge>
  );
}

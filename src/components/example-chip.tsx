import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExampleChipProps {
  onClick: () => void;
}

export function ExampleChip({ onClick }: ExampleChipProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="gap-2"
      data-testid="button-example"
    >
      Try an example
      <ArrowRight className="w-3 h-3" />
    </Button>
  );
}

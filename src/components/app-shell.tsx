import { ReactNode, useState } from 'react';
import { useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';
import { pageTransition } from '@/lib/animation';
import { Button } from '@/components/ui/button';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 overflow-auto min-w-0">
        <div className="sticky top-0 z-20 lg:hidden flex items-center gap-2 px-4 py-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="h-8 w-8 shrink-0"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <span className="font-mono font-semibold text-sm tracking-tight">
            codev<span className="text-primary">kit</span>
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            variants={pageTransition}
            initial="initial"
            animate="enter"
            exit="exit"
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

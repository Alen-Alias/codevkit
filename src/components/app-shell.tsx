import { ReactNode } from 'react';
import { useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './sidebar';
import { pageTransition } from '@/lib/animation';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [location] = useLocation();

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto min-w-0">
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

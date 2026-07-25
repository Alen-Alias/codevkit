import { motion } from 'framer-motion';
import { Kbd } from './kbd';
import { fadeInUp, staggerContainer } from '@/lib/animation';

interface ToolShellProps {
  title: string;
  description: string;
  shortcut?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function ToolShell({ title, description, shortcut, actions, children }: ToolShellProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col"
    >
      <motion.div
        variants={fadeInUp}
        className="flex-shrink-0 border-b border-border bg-card px-4 sm:px-6 py-3 sm:py-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-semibold truncate">{title}</h1>
              {shortcut && <Kbd className="hidden sm:inline-flex">{shortcut}</Kbd>}
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{description}</p>
          </div>
          {actions && <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 flex-shrink-0 flex-wrap"
          >
            {actions}
          </motion.div>}
        </div>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="flex-1 overflow-auto"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

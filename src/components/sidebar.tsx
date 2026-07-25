import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Clock, Settings, ChevronDown, ChevronRight, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { plugins, CATEGORIES, CATEGORY_LABELS } from '@/lib/plugin-registry';
import { useFavorites } from '@/contexts/favorites-context';
import { useRecents } from '@/contexts/recents-context';
import { useCommandPalette } from '@/contexts/command-palette-context';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Category } from '@/lib/types';
import { accordionContent, sidebarItem, staggerFast } from '@/lib/animation';

export function Sidebar() {
  const [location] = useLocation();
  const { open } = useCommandPalette();
  const { favorites } = useFavorites();
  const { recents } = useRecents();
  const [collapsedCategories, setCollapsedCategories] = useState<Set<Category>>(new Set());

  const toggleCategory = (cat: Category) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const isActive = (slug: string) => location === `/tools/${slug}`;

  const favoritePlugins = favorites
    .map((id) => plugins.find((p) => p.id === id))
    .filter(Boolean);

  const recentPlugins = recents
    .slice(0, 5)
    .map((id) => plugins.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <aside className="w-60 shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <motion.div
              whileHover={{ rotate: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-6 h-6 rounded bg-primary flex items-center justify-center"
            >
              <Terminal className="w-3.5 h-3.5 text-primary-foreground" />
            </motion.div>
            <span className="font-mono font-semibold text-sm tracking-tight text-sidebar-foreground">
              codev<span className="text-primary">kit</span>
            </span>
          </motion.div>
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={open}
          className="group w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-sidebar-accent hover:bg-accent rounded-md transition-all duration-200 border border-sidebar-border hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        >
          <Search className="w-3.5 h-3.5 transition-all duration-200 group-hover:text-primary" />
          <span className="flex-1 text-left transition-all duration-200 group-hover:text-foreground">Search tools...</span>
          <span className="text-xs bg-background border border-border rounded px-1.5 py-0.5 font-mono transition-all duration-200 group-hover:border-primary/30 group-hover:text-primary">
            ⌘K
          </span>
        </motion.button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-1">
        {/* Favorites */}
        {favoritePlugins.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerFast}
            className="mb-3"
          >
            <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Star className="w-3 h-3" />
              Favorites
            </div>
            {favoritePlugins.map((plugin) => {
              if (!plugin) return null;
              const Icon = plugin.icon;
              return (
                <motion.div key={plugin.id} variants={sidebarItem}>
                  <Link href={`/tools/${plugin.slug}`}>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={cn(
                        'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer transition-colors',
                        isActive(plugin.slug)
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{plugin.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Recents */}
        {recentPlugins.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerFast}
            className="mb-3"
          >
            <div className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              Recent
            </div>
            {recentPlugins.map((plugin) => {
              if (!plugin) return null;
              const Icon = plugin.icon;
              return (
                <motion.div key={plugin.id} variants={sidebarItem}>
                  <Link href={`/tools/${plugin.slug}`}>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={cn(
                        'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer transition-colors',
                        isActive(plugin.slug)
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">{plugin.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Categories */}
        {CATEGORIES.map((category) => {
          const categoryPlugins = plugins.filter((p) => p.category === category);
          const isCollapsed = collapsedCategories.has(category);

          return (
            <div key={category} className="mb-1">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <motion.div
                  animate={{ rotate: isCollapsed ? 0 : 90 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
                {CATEGORY_LABELS[category]}
              </motion.button>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    key={`${category}-items`}
                    variants={accordionContent}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden"
                  >
                    <motion.div
                      variants={staggerFast}
                      initial="hidden"
                      animate="visible"
                      className="ml-1"
                    >
                      {categoryPlugins.map((plugin) => {
                        const Icon = plugin.icon;
                        return (
                          <motion.div key={plugin.id} variants={sidebarItem}>
                            <Link href={`/tools/${plugin.slug}`}>
                              <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className={cn(
                                  'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer transition-colors group',
                                  isActive(plugin.slug)
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60'
                                )}
                              >
                                <Icon
                                  className={cn(
                                    'w-3.5 h-3.5 shrink-0',
                                    isActive(plugin.slug) ? 'text-primary' : 'text-muted-foreground'
                                  )}
                                />
                                <span className="truncate">{plugin.name}</span>
                                {plugin.shortcut && (
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="ml-auto text-xs text-muted-foreground font-mono"
                                  >
                                    {plugin.shortcut}
                                  </motion.span>
                                )}
                              </motion.div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </ScrollArea>

      {/* Bottom actions */}
      <div className="border-t border-sidebar-border px-3 py-3 flex items-center justify-between">
        <Link href="/settings">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'gap-2 text-muted-foreground hover:text-foreground h-8 px-2',
              location === '/settings' && 'text-foreground'
            )}
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </Button>
        </Link>
        <ThemeToggle />
      </div>
    </aside>
  );
}

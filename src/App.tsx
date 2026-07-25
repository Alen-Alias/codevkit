import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { RecentsProvider } from '@/contexts/recents-context';
import { CommandPaletteProvider, useCommandPalette } from '@/contexts/command-palette-context';
import { AppShell } from '@/components/app-shell';
import { CommandPalette } from '@/components/command-palette';
import { ShortcutsOverlay } from '@/components/shortcuts-overlay';
import { HomePage } from '@/pages/home';
import { ToolPage } from '@/pages/tool-page';
import { SettingsPage } from '@/pages/settings';
import NotFound from '@/pages/not-found';

function GlobalKeyboardHandler() {
  const { open } = useCommandPalette();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return null;
}

function InnerApp() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <GlobalKeyboardHandler />
      <CommandPalette />
      <ShortcutsOverlay />
      <AppShell>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/tools/:slug" component={ToolPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      </AppShell>
    </WouterRouter>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <TooltipProvider>
        <FavoritesProvider>
          <RecentsProvider>
            <CommandPaletteProvider>
              <InnerApp />
              <Toaster />
            </CommandPaletteProvider>
          </RecentsProvider>
        </FavoritesProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;

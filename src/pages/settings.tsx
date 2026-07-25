import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Shield, Download, Upload, RotateCcw, Monitor, Sun, Moon, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { useDocumentTitle } from '@/hooks/use-document-title';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { staggerContainer, fadeInUp, fadeInScale, springTransition } from '@/lib/animation';

export function SettingsPage() {
  useDocumentTitle('Settings — CodevKit');
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [jsonIndent, setJsonIndent] = useLocalStorage<number | 'tab'>(STORAGE_KEYS.JSON_INDENT, 2 as number | 'tab');
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleExport = () => {
    const settings: Record<string, unknown> = {};
    for (const [, value] of Object.entries(STORAGE_KEYS)) {
      const item = localStorage.getItem(value);
      if (item !== null) {
        try {
          settings[value] = JSON.parse(item);
        } catch {
          settings[value] = item;
        }
      }
    }
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codevkit-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Settings exported', description: 'codevkit-settings.json downloaded.' });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string) as Record<string, unknown>;
          for (const [key, value] of Object.entries(data)) {
            localStorage.setItem(key, JSON.stringify(value));
          }
          toast({ title: 'Settings imported', description: 'Reload the page to apply all settings.' });
        } catch {
          toast({ title: 'Import failed', description: 'Invalid settings file.', variant: 'destructive' });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    for (const value of Object.values(STORAGE_KEYS)) {
      localStorage.removeItem(value);
    }
    toast({ title: 'Settings reset', description: 'All settings cleared.' });
    setTimeout(() => window.location.reload(), 500);
  };

  const themeOptions = [
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          All settings are stored locally in your browser.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Appearance */}
        <motion.section variants={fadeInUp} className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Appearance
          </h2>
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Theme</Label>
              <div className="flex flex-wrap gap-2">
                {themeOptions.map(({ value, label, icon: Icon }) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setTheme(value)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors',
                      theme === value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted text-foreground'
                    )}
                  >
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={springTransition}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </motion.div>
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* JSON Formatter */}
        <motion.section variants={fadeInUp} className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            JSON Formatter
          </h2>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Default indentation</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Applied when formatting JSON
                </p>
              </div>
              <Select
                value={String(jsonIndent)}
                onValueChange={(v) => setJsonIndent(v === 'tab' ? 'tab' : Number(v) as 2 | 4)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="tab">Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.section>

        {/* Privacy */}
        <motion.section variants={fadeInUp} className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Privacy
          </h2>
          <motion.div
            variants={fadeInScale}
            className="bg-card border border-border rounded-lg p-4"
          >
            <div className="flex gap-3">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              </motion.div>
              <div>
                <p className="text-sm font-medium">Your data never leaves your browser</p>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  codevkit is a fully offline, client-side application. It makes zero network
                  requests for tool processing. No analytics, no telemetry, no tracking. Your
                  inputs, settings, and history are stored only in your browser's local storage
                  and never transmitted anywhere.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Data management */}
        <motion.section variants={fadeInUp} className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Data
          </h2>
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">Export settings</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Download your settings as JSON
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                  <Download className="w-3.5 h-3.5" />
                  Export
                </Button>
              </motion.div>
            </motion.div>
            <Separator />
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">Import settings</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Restore from a previously exported file
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={handleImport} className="gap-2">
                  <Upload className="w-3.5 h-3.5" />
                  Import
                </Button>
              </motion.div>
            </motion.div>
            <Separator />
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-destructive">Reset all settings</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Clears favorites, recents, and preferences
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="destructive" size="sm" onClick={() => setShowResetDialog(true)} className="gap-2">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Reset all settings?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will clear your favorites, recents, and preferences. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}

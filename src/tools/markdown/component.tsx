import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Download } from 'lucide-react';
import { ToolShell } from '@/components/tool-shell';
import { CopyButton } from '@/components/copy-button';
import { ExampleChip } from '@/components/example-chip';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { wordCount, charCount, EXAMPLE_MARKDOWN } from './utils';
import 'highlight.js/styles/github-dark.css';

export function MarkdownComponent() {
  const [input, setInput] = useState('');
  const [view, setView] = useState<'split' | 'editor' | 'preview'>('split');

  const handleDownload = () => {
    const blob = new Blob([input], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const words = wordCount(input);
  const chars = charCount(input);

  const editor = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Editor</label>
        {!input && <ExampleChip onClick={() => setInput(EXAMPLE_MARKDOWN)} />}
      </div>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 font-mono text-sm resize-none border-0 rounded-none focus-visible:ring-0 bg-transparent"
        placeholder="Start writing Markdown..."
      />
      <div className="flex items-center gap-4 px-3 py-2 border-t border-border text-xs text-muted-foreground bg-muted/20">
        <span>{words} words</span>
        <span>{chars} chars</span>
      </div>
    </div>
  );

  const preview = (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-3 py-2 border-b border-border bg-muted/30">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview</label>
      </div>
      <div className="flex-1 overflow-auto p-6">
        {input ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {input}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm italic">Preview will appear here...</p>
        )}
      </div>
    </div>
  );

  return (
    <ToolShell
      title="Markdown Editor"
      description="Write and preview Markdown with syntax highlighting"
      actions={
        <>
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
            <TabsList>
              <TabsTrigger value="split">Split</TabsTrigger>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
          {input && <CopyButton text={input} />}
          {input && (
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
              <Download className="w-3.5 h-3.5" />
              .md
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => setInput('')}>Clear</Button>
        </>
      }
    >
      <div className="flex h-[calc(100vh-9rem)] border-t border-border">
        {view === 'split' && (
          <>
            <div className="w-1/2 border-r border-border flex flex-col overflow-hidden">
              {editor}
            </div>
            <div className="w-1/2 flex flex-col overflow-hidden">
              {preview}
            </div>
          </>
        )}
        {view === 'editor' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {editor}
          </div>
        )}
        {view === 'preview' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {preview}
          </div>
        )}
      </div>
    </ToolShell>
  );
}

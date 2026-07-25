import { useEffect } from 'react';
import { useParams } from 'wouter';
import { getPlugin } from '@/lib/plugin-registry';
import { useRecents } from '@/contexts/recents-context';
import NotFound from '@/pages/not-found';

export function ToolPage() {
  const params = useParams<{ slug: string }>();
  const { addRecent } = useRecents();
  const slug = params.slug;

  const plugin = getPlugin(slug);

  useEffect(() => {
    if (plugin) {
      addRecent(plugin.id);
      document.title = `${plugin.name} — CodevKit`;
    }
  }, [plugin, addRecent]);

  if (!plugin) {
    return <NotFound />;
  }

  const Component = plugin.component;
  return <Component />;
}

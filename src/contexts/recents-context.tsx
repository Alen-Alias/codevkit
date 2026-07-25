import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage, STORAGE_KEYS } from '@/lib/storage';

interface RecentsContextType {
  recents: string[];
  addRecent: (id: string) => void;
}

const RecentsContext = createContext<RecentsContextType | undefined>(undefined);

export function RecentsProvider({ children }: { children: ReactNode }) {
  const [recents, setRecents] = useLocalStorage<string[]>(STORAGE_KEYS.RECENTS, []);

  const addRecent = (id: string) => {
    setRecents(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 10);
    });
  };

  return (
    <RecentsContext.Provider value={{ recents, addRecent }}>
      {children}
    </RecentsContext.Provider>
  );
}

export function useRecents() {
  const context = useContext(RecentsContext);
  if (!context) {
    throw new Error('useRecents must be used within RecentsProvider');
  }
  return context;
}

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'recettes_v1';

export function useRecettes() {
  const [recettes, setRecettes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('localStorage read error', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recettes));
    } catch (e) {
      console.warn('localStorage write error', e);
    }
  }, [recettes]);

  function addRecette(r) {
    setRecettes(prev => [...prev, r]);
  }

  function removeRecette(id) {
    setRecettes(prev => prev.filter(r => r.id !== id));
  }

  function updateRecette(updated) {
    setRecettes(prev => prev.map(r => r.id === updated.id ? { ...r, ...updated } : r));
  }

  function toggleFavorite(id) {
    setRecettes(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  }

  return { recettes, addRecette, removeRecette, updateRecette, toggleFavorite };
}

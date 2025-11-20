import { useEffect, useRef, useState } from 'react';

// Ce hook charge les recettes depuis localStorage si présentes,
const STORAGE_KEY = 'recettes_v1';

export function useRecettes() {
  const [recettes, setRecettes] = useState([]);
  const isInitial = useRef(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (!cancelled) setRecettes(parsed);
        } else {
          // tentative de récupération d'un fichier JSON dans public/
          try {
            const res = await fetch('/recettes.json');
            if (res.ok) {
              const data = await res.json();
              if (!cancelled) setRecettes(data);
            }
          } catch (e) {
            console.warn('fetch recettes.json error', e);
          }
        }
      } catch (e) {
        console.warn('localStorage read error', e);
      } finally {
        // Fin de la phase initiale de chargement
        isInitial.current = false;
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // Sauvegarde dans localStorage après la phase initiale
  useEffect(() => {
    if (isInitial.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recettes));
    } catch (e) {
      console.warn('localStorage write error', e);
    }
  }, [recettes]);

  function addRecette(r) {
    setRecettes(prev => {
      const next = [...prev, r];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn('localStorage write error', e); }
      return next;
    });
  }

  function removeRecette(id) {
    setRecettes(prev => {
      const next = prev.filter(r => r.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn('localStorage write error', e); }
      return next;
    });
  }

  function updateRecette(updated) {
    setRecettes(prev => {
      const next = prev.map(r => r.id === updated.id ? { ...r, ...updated } : r);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn('localStorage write error', e); }
      return next;
    });
  }

  function toggleFavorite(id) {
    setRecettes(prev => {
      const next = prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) { console.warn('localStorage write error', e); }
      return next;
    });
  }

  return { recettes, addRecette, removeRecette, updateRecette, toggleFavorite };
}

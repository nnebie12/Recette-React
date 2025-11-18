import { useEffect, useRef, useState } from 'react';

// Ce hook charge les recettes depuis localStorage si présentes,
// sinon tente de charger `/recettes.json` depuis le dossier `public` (fallback).
// Il sauvegarde ensuite les recettes dans localStorage à chaque changement
// (en évitant d'écraser pendant la phase de chargement initial).
const STORAGE_KEY = 'recettes_v1';

export function useRecettes() {
  const [recettes, setRecettes] = useState([]);
  const isInitial = useRef(true);

  // Chargement au montage : localStorage -> fallback fetch('/recettes.json')
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

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'recettes_v1';

export function useRecettes() {
  const [recettes, setRecettes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Chargement initial depuis localStorage ou fetch
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (!cancelled) {
            setRecettes(parsed);
            console.log('✅ Recettes chargées depuis localStorage:', parsed);
          }
        } else {
          // Tentative de récupération d'un fichier JSON dans public/
          try {
            const res = await fetch('/recettes.json');
            if (res.ok) {
              const data = await res.json();
              if (!cancelled) {
                setRecettes(data);
                console.log('✅ Recettes chargées depuis recettes.json:', data);
              }
            } else {
              // Aucune donnée, initialiser avec tableau vide
              console.log('ℹ️ Aucune recette trouvée, démarrage avec tableau vide');
              setRecettes([]);
            }
          } catch (e) {
            console.warn('⚠️ Erreur fetch recettes.json:', e);
            setRecettes([]);
          }
        }
      } catch (e) {
        console.warn('⚠️ Erreur lecture localStorage:', e);
        setRecettes([]);
      } finally {
        if (!cancelled) {
          setIsLoaded(true);
          console.log('✅ Chargement terminé');
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // Sauvegarde automatique dans localStorage après chaque modification
  useEffect(() => {
    if (!isLoaded) {
      console.log('⏳ Attente fin du chargement initial...');
      return;
    }
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recettes));
      console.log('💾 Recettes sauvegardées dans localStorage:', recettes);
    } catch (e) {
      console.error('❌ Erreur sauvegarde localStorage:', e);
    }
  }, [recettes, isLoaded]);

  function addRecette(r) {
    console.log('➕ Ajout de recette:', r);
    setRecettes(prev => [...prev, r]);
  }

  function removeRecette(id) {
    console.log('🗑️ Suppression de recette:', id);
    setRecettes(prev => prev.filter(r => r.id !== id));
  }

  function updateRecette(updated) {
    console.log('✏️ Mise à jour de recette:', updated);
    setRecettes(prev => prev.map(r => r.id === updated.id ? { ...r, ...updated } : r));
  }

  function toggleFavorite(id) {
    console.log('⭐ Toggle favori pour recette:', id);
    setRecettes(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  }

  return { recettes, addRecette, removeRecette, updateRecette, toggleFavorite, isLoaded };
}
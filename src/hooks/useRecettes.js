import { useEffect, useState } from 'react';

const STORAGE_KEY = 'recettes_v1';

// Recettes en dur pour l'illusion de contenu
const RECETTES_INITIALES = [
  { 
    id: 1, 
    name: "Gâteau au Chocolat", 
    title: "Gâteau au Chocolat",
    categorie: "desserts", 
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    description: "Délicieux gâteau moelleux au chocolat noir",
    temps: "45min",
    preparationTime: "45min",
    difficulty: "Facile",
    ingredients: ["200g chocolat noir", "3 œufs", "100g beurre", "150g sucre", "80g farine"],
    preparation: ["Faire fondre le chocolat avec le beurre", "Battre les œufs avec le sucre", "Mélanger le tout et ajouter la farine", "Cuire 25min à 180°C"],
    isFavorite: false 
  },
  { 
    id: 2, 
    name: "Tarte aux Pommes",
    title: "Tarte aux Pommes", 
    categorie: "desserts", 
    image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=600&q=80",
    description: "Tarte classique et savoureuse aux pommes caramélisées",
    preparationTime: "1h",
    temps: "1h",
    difficulty: "Moyenne",
    ingredients: ["1 pâte feuilletée", "4 pommes", "50g sucre", "30g beurre", "Cannelle"],
    preparation: ["Étaler la pâte dans un moule", "Couper les pommes en lamelles", "Disposer sur la pâte et saupoudrer de sucre", "Cuire 35min à 180°C"],
    isFavorite: false 
  },
  { 
    id: 3, 
    name: "Smoothie Fraise Banane",
    title: "Smoothie Fraise Banane", 
    categorie: "boissons", 
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&q=80",
    description: "Smoothie vitaminé et rafraîchissant",
    preparationTime: "5min",
    temps: "5min",
    difficulty: "Facile",
    ingredients: ["200g fraises", "1 banane", "200ml lait", "1 c. à soupe miel"],
    preparation: ["Laver les fraises", "Couper la banane", "Mixer tous les ingrédients ensemble", "Servir frais"],
    isFavorite: false 
  },
  { 
    id: 4, 
    name: "Salade César",
    title: "Salade César", 
    categorie: "plats", 
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80",
    description: "Salade fraîche et croquante avec poulet grillé",
    preparationTime: "20min",
    temps: "20min",
    difficulty: "Facile",
    ingredients: ["Laitue romaine", "Poulet grillé", "Croûtons", "Parmesan", "Sauce césar"],
    preparation: ["Laver et couper la laitue", "Griller le poulet et le couper en morceaux", "Mélanger avec les croûtons et le parmesan", "Ajouter la sauce césar"],
    isFavorite: false 
  },
  { 
    id: 5, 
    name: "Jus d'Orange Frais",
    title: "Jus d'Orange Frais", 
    categorie: "boissons", 
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    description: "Jus frais pressé du matin",
    preparationTime: "5min",
    temps: "5min",
    difficulty: "Facile",
    ingredients: ["4 oranges"],
    preparation: ["Couper les oranges en deux", "Presser les oranges", "Filtrer si désiré", "Servir immédiatement"],
    isFavorite: false 
  },
];

export function useRecettes() {
  const [recettes, setRecettes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Chargement initial depuis localStorage
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (!cancelled) {
            // Séparer les recettes initiales des recettes utilisateur
            const recettesUtilisateur = parsed.filter(r => r.id > 5);
            
            // Récupérer les modifications des recettes initiales (favoris, etc.)
            const recettesInitialesModifiees = RECETTES_INITIALES.map(recetteInit => {
              const modification = parsed.find(r => r.id === recetteInit.id);
              return modification ? { ...recetteInit, ...modification } : recetteInit;
            });
            
            const recettesCombinees = [...recettesInitialesModifiees, ...recettesUtilisateur];
            setRecettes(recettesCombinees);
            console.log('✅ Recettes chargées:', {
              total: recettesCombinees.length,
              initiales: recettesInitialesModifiees.length,
              utilisateur: recettesUtilisateur.length
            });
          }
        } else {
          console.log('ℹ️ Utilisation des recettes initiales');
          setRecettes(RECETTES_INITIALES);
        }
      } catch (e) {
        console.warn('⚠️ Erreur lecture localStorage:', e);
        setRecettes(RECETTES_INITIALES);
      } finally {
        if (!cancelled) {
          setIsLoaded(true);
          console.log('✅ Chargement terminé');
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      // Sauvegarder TOUTES les recettes (pour garder les modifications sur les initiales)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recettes));
      console.log('💾 Recettes sauvegardées:', recettes.length);
    } catch (e) {
      console.error('❌ Erreur sauvegarde localStorage:', e);
    }
  }, [recettes, isLoaded]);

  function addRecette(r) {
    console.log('➕ Ajout de recette:', r);
    const nouvelleRecette = {
      ...r,
      title: r.title || r.name,
      name: r.name || r.title,
    };
    setRecettes(prev => [...prev, nouvelleRecette]);
  }

  function removeRecette(id) {
    console.log('🗑️ Suppression de recette:', id);
    // Empêcher la suppression des recettes initiales
    if (id <= 5) {
      console.warn('⚠️ Impossible de supprimer une recette initiale');
      return;
    }
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
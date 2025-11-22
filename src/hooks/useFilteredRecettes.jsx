import { useMemo } from "react";

export function useFilteredRecipes(recipes, activeCategory, searchTerm, selectedDifficulty = "all") {
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Gestion des favoris
      if (activeCategory === "favoris") {
        return recipe.isFavorite === true;
      }

      // Vérifier que les propriétés existent avant de les utiliser
      const recipeTitle = recipe.title || recipe.name || '';
      const recipeCategory = recipe.categorie || recipe.category || '';
      const recipeDifficulty = recipe.difficulty || recipe.difficulties || '';

      // Filtre par catégorie
      const matchesCategory =
        activeCategory === "all" || recipeCategory === activeCategory;

      // Filtre par difficulté
      const matchesDifficulty =
        selectedDifficulty === "all" || recipeDifficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      // Filtre par recherche
      const matchesSearch =
        recipeTitle.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch && matchesDifficulty;
    });
  }, [recipes, activeCategory, searchTerm, selectedDifficulty]);

  return filteredRecipes;
}
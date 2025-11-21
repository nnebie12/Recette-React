import { useMemo } from "react";

export function useFilteredRecipes(recipes, activeCategory, searchTerm, selectedDifficulty) {


  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
    
    if (activeCategory === "favoris") {

            return recipe.isFavorite === true;
    }

      const matchesCategory =
        activeCategory === "all" || recipe.category === activeCategory;

    
      const matchesDifficulties=
          selectedDifficulty === "all" || recipe.difficulties === selectedDifficulty;


      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch && matchesDifficulties;
    });
  }, [recipes, activeCategory, searchTerm]);

  return filteredRecipes;
}
import { useState } from 'react'
import Layout from '../components/Layout/wrapper';  
import RecetteList from '../components/Card/RecipeList';
import { useRecettes } from '../hooks/useRecettes';
import CategorySelect from '../components/CategorySelect';
import { useFilteredRecipes } from "../hooks/useFilterRecettes";

function Home({searchTerm, activeCategory, setActiveCategory}) {
    const { recettes, toggleFavorite } = useRecettes();
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");

    const filteredRecipes  = useFilteredRecipes(
        recettes,
        activeCategory,
        searchTerm
    );
    const [difficulty] = useState([
    { id: "1", name: "Facile"},
    { id: "2", name: "Moyen"},
    { id: "3", name: "Difficile"},]);

    const [categories] = useState([
    { id: "all", name: "Tous", count: 156 },
    { id: "desserts", name: "Dessert", count: 103 },
    { id: "drinks", name: "Boissons", count: 87 },
    { id: "favoris", name: "favoris", count: 87 },
  ]);

     

    return (
        <>
            <Layout>
                <CategorySelect 
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    recipes={recettes} 


                />
                <RecetteList 
                    filteredRecipes={filteredRecipes} 
                    toggleFavorite={toggleFavorite}
                />

            </Layout>
            
        </>
    );

}

export default Home;
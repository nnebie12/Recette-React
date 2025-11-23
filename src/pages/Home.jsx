import { useState } from 'react'
import Layout from '../components/Layout/wrapper';  
import { useRecettes } from '../hooks/useRecettes';
import CategorySelect from '../components/CategorySelect';
import RecetteList from '../components/Card/RecetteList';
import { useFilteredRecipes } from "../hooks/useFilteredRecettes";

function Home({searchTerm, activeCategory, setActiveCategory}) {
    const { recettes, toggleFavorite } = useRecettes();
    const [, _setSelectedDifficulty] = useState("all");

    const filteredRecipes  = useFilteredRecipes(
        recettes,
        activeCategory,
        searchTerm
    );

    const [categories] = useState([
    { id: "all", name: "Tous" },
    { id: "desserts", name: "Dessert" },
    { id: "drinks", name: "Boissons" },
    { id: "favoris", name: "favoris"},
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
import { useState } from 'react'
import Layout from '../components/Layout/wrapper';  
import { useRecettes } from '../hooks/useRecettes';
import CategorySelect from '../components/CategorySelect';
import RecetteList from '../components/RecetteList/RecetteList';
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
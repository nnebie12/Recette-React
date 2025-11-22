import Card from "../Card/Card";

function RecetteList({ filteredRecipes, toggleFavorite}) {


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-5">
            {filteredRecipes.length === 0? (
                <p className="text-center col-span-full text-gray-500">Aucune recette trouvée</p>
            ) : (                         
                filteredRecipes.map((recipe) => (
                    <Card key={recipe.id} recette={recipe} toggleFavorite={toggleFavorite}/>
                )
            ))}
        
        </div>
    );
 
}

export default RecetteList;
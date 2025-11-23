import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function RecipeFilter() {
  const navigate = useNavigate();

  const [categories] = useState([
    { id: "all", name: "Tous", count: 156 },
    { id: "desserts", name: "Dessert", count: 103 },
    { id: "drinks", name: "Boissons", count: 87 },
  ]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm] = useState("");

  const [recipes] = useState([
    { id: 1, name: "Gâteau au Chocolat", category: "desserts", image: "🍰", description: "Délicieux gâteau moelleux" },
    { id: 2, name: "Tarte aux Pommes", category: "desserts", image: "🥧", description: "Tarte classique et savoureuse" },
    { id: 3, name: "Jus d'Orange", category: "drinks", image: "🧃", description: "Jus frais pressé" },
    { id: 4, name: "Smoothie Fraise", category: "drinks", image: "🍓", description: "Smoothie vitaminé" },
    { id: 5, name: "Salade César", category: "all", image: "🥗", description: "Salade fraîche et croquante" },
  ]);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "all" || recipe.category === activeCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">


      {/* Catégories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Catégories</h2>

        <div className="flex items-center gap-4 flex-wrap">

          {/* Bouton + → redirection */}
          <button
            onClick={() => navigate("/ajouter")}
            className="flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
            style={{ backgroundColor: "#CDA077" }}
          >
            <Plus className="w-6 h-6 text-white font-bold" strokeWidth={3} />
          </button>

          <div className="flex gap-3 flex-wrap items-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "text-gray-800 shadow-sm"
                    : "text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === category.id
                      ? "#CDA077"
                      : "white",
                }}
              >
                <span className="font-medium">{category.name}</span>
                <span className="text-xs ml-1 text-gray-500">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des recettes */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Recettes ({filteredRecipes.length})
        </h3>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="text-5xl p-4 bg-gray-100 text-center">{recipe.image}</div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-2">{recipe.name}</h4>
                  <p className="text-sm text-gray-600">{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">Aucune recette trouvée</div>
        )}
      </div>
    </div>
  );
}

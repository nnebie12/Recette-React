import { useState, useContext } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecettes } from '../hooks/useRecettes';
import FavoriteButton from '../components/Card/FavoriteButton';
import NavBar from '../components/Layout/NavBar';
import { AppContext } from '../context/appContext';

export default function RecettesPage() {
  const navigate = useNavigate();
  const { recettes, toggleFavorite } = useRecettes();
  const { isDark } = useContext(AppContext);

  const [categories] = useState([
    { id: "all", name: "Tous" },
    { id: "desserts", name: "Dessert" },
    { id: "drinks", name: "Boissons" },
    { id: "plats", name: "Plats" },
  ]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les recettes selon catégorie et recherche
  const filteredRecettes = recettes.filter((recette) => {
    const matchesCategory = 
      activeCategory === "all" || 
      recette.categorie?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = 
      recette.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recette.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Compter les recettes par catégorie
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return recettes.length;
    return recettes.filter(r => 
      r.categorie?.toLowerCase() === categoryId.toLowerCase()
    ).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-stone-900 transition-colors duration-500">
      {/* NavBar */}
      <NavBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="p-6">
        {/* Catégories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Catégories
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Bouton + pour ajouter une recette */}
            <button
              onClick={() => navigate("/ajouter")}
              className="flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
              style={{ backgroundColor: "#CDA077" }}
              title="Ajouter une recette"
            >
              <Plus className="w-6 h-6 text-white font-bold" strokeWidth={3} />
            </button>

            {/* Liste des catégories */}
            <div className="flex gap-3 flex-wrap items-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm"
                  }`}
                  style={{
                    backgroundColor: activeCategory === category.id 
                      ? "#CDA077" 
                      : isDark 
                      ? "#374151" 
                      : "white",
                  }}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-xs ml-1 opacity-70">
                    ({getCategoryCount(category.id)})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Liste des recettes en Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Recettes ({filteredRecettes.length})
          </h3>

          {filteredRecettes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRecettes.map((recette) => (
                <div
                  key={recette.id}
                  className="rounded-xl shadow-lg dark:shadow-2xl aspect-square p-3 grid gap-2 align-items-center relative overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                >
                  {/* Image de fond */}
                  <div
                    className="absolute inset-0 bg-cover bg-center brightness-70 dark:brightness-60"
                    style={{
                      backgroundImage: recette.image
                        ? `url(${recette.image})`
                        : `linear-gradient(135deg, #CDA077 0%, #8B6F47 100%)`,
                    }}
                  ></div>

                  {/* Lien cliquable vers le détail */}
                  <a
                    href={`/recette/${recette.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Voir la recette ${recette.title}`}
                  ></a>

                  {/* Contenu de la card */}
                  <div className="relative text-white h-full flex flex-col justify-between text-center gap-4">
                    {/* Bouton favori */}
                    <div className="flex justify-end z-20">
                      <FavoriteButton
                        isFavorite={recette.isFavorite}
                        onToggle={() => toggleFavorite(recette.id)}
                      />
                    </div>

                    {/* Titre de la recette */}
                    <h3 className="text-white grow font-bold text-lg mt-2 items-center my-auto drop-shadow-lg">
                      {recette.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg">Aucune recette trouvée</p>
              <button
                onClick={() => navigate("/ajouter")}
                className="mt-4 px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition"
                style={{ backgroundColor: "#CDA077" }}
              >
                Créer ma première recette
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
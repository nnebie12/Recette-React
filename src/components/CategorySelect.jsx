import { Plus   } from "lucide-react";
import { Link } from "react-router";

function CategorySelect({ categories, activeCategory, setActiveCategory, recipes }) {
    const getCategoryCount = (categoryId) => {
        if (!recipes) return 0; 

        if (categoryId === "all") return recipes.length;

        return recipes.filter(r => r.category === categoryId).length;
    };
    return (
        <div className="mb-8">
        <div className="flex items-center gap-4 flex-wrap">
            
          {/* Add button */}
          <Link to="/add">
          <button
            className="flex p-0 bg-gold-custom items-center justify-center w-11 h-11 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 "
            aria-label="Add new category"
          >
            <Plus className="w-6 h-6 text-white font-bold" strokeWidth={3} />
          </button>
           </Link>

          {/* Category buttons */}
          <div className="flex gap-3 flex-wrap items-center">
            {categories
            .filter(cat => cat.id !== "favoris")
            .map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "text-white-700 shadow-sm"
                    : "text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === category.id
                      ? "var(--recipe-filter-accent)"
                      : "white",
                }}
              >
                <span className={`
                ${
                  activeCategory === category.id
                    ? "text-white font-600"
                    : "gray-800"
                }`} >{category.name} ({getCategoryCount(category.id)})</span>
              </button>
            ))}
          </div>
        </div>
    </div>
    );
}

export default CategorySelect;
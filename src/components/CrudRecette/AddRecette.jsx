import { useRef, useState } from 'react';
import { useRecettes } from '../../hooks/useRecettes';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Layout/NavBar';

export default function AddRecette({ addRecette: addRecetteProp }) {
  const hook = useRecettes();
  const addRecette = addRecetteProp || hook.addRecette;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    ingredients: [],
    preparation: [],
    difficulty: 'facile',
    preparationTime: '',
    description: '',
    categorie: 'plats',
    image: null,
    __ingredientsText: '',
    __stepText: '',
  });

  const [showIngredientsList, setShowIngredientsList] = useState(false);
  const [showStepsList, setShowStepsList] = useState(false);

  const suggestions = ['Tomate', 'Oignon', 'Ail', 'Sel', 'Poivre', 'Beurre', 'Olive', 'Basilic'];
  const stepSuggestions = ['Couper en dés', 'Émincer', 'Faire revenir', 'Mijoter 10 min', 'Assaisonner', 'Cuire 20 min'];

  const containerRef = useRef(null);
  const [toast, setToast] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleIngredientsInputChange(e) {
    setForm(prev => ({ ...prev, __ingredientsText: e.target.value }));
  }

  function addIngredient(ing) {
    setForm(prev => ({
      ...prev,
      ingredients: Array.from(new Set([...prev.ingredients, ing])),
      __ingredientsText: '',
    }));
    setShowIngredientsList(false);
  }

  function removeIngredient(ing) {
    setForm(prev => ({ ...prev, ingredients: prev.ingredients.filter(i => i !== ing) }));
  }

  function addStep(step) {
    setForm(prev => ({
      ...prev,
      preparation: [...prev.preparation, step],
      __stepText: '',
    }));
    setShowStepsList(false);
  }

  function handleImageChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setForm(prev => ({ ...prev, image: null }));
  }

  function removeStep(index) {
    setForm(prev => ({
      ...prev,
      preparation: prev.preparation.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newRecette = {
      id: Date.now(),
      name: form.name,
      ingredients: form.ingredients,
      preparation: form.preparation,
      image: form.image || null,
      isFavorite: false,
      difficulty: form.difficulty,
      preparationTime: form.preparationTime,
      description: form.description,
      categorie: form.categorie,
    };

    addRecette(newRecette);
    setToast('Recette créée');
    setTimeout(() => {
      setToast('');
      navigate('/');
    }, 1400);

    setForm({
      name: '',
      ingredients: [],
      preparation: [],
      difficulty: 'facile',
      preparationTime: '',
      description: '',
      categorie: 'plats',
      image: null,
      __ingredientsText: '',
      __stepText: '',
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-stone-900 transition-colors duration-500">
      <NavBar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-stone-900 py-10 px-4 transition-colors duration-500">
        {toast && (
          <div
            role="status"
            className="fixed right-6 top-6 bg-black dark:bg-stone-700 text-white px-4 py-2 rounded-md shadow-md z-50"
            style={{ opacity: 0.95 }}
          >
            {toast}
          </div>
        )}
        
        <form
          onSubmit={handleSubmit}
          ref={containerRef}
          className="p-8 bg-white dark:bg-stone-800 shadow-md dark:shadow-2xl rounded-md w-full max-w-3xl mx-auto border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          {/* IMAGE UPLOAD */}
          <label className="block mb-6">
            <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center bg-gray-50 dark:bg-stone-700 transition-colors duration-300">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageUpload" />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: "#CDA077" }}
              >
                Upload Image
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Type d'image accepté : jpg, jpeg et png</p>
            </div>

            {form.image && (
              <div className="mt-4">
                <img
                  src={form.image}
                  alt="preview"
                  className="w-48 rounded-md shadow border dark:border-gray-600 mb-3"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Supprimer l'image
                </button>
              </div>
            )}
          </label>

          {/* NOM */}
          <label className="block mb-6">
            <span className="font-medium text-gray-700 dark:text-gray-200">Nom</span>
            <input
              name="name"
              type="text"
              placeholder="Nom" 
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-stone-700 text-gray-900 dark:text-white p-3 rounded-md transition-colors duration-300"
            />
          </label>

          {/* CATÉGORIE + DIFFICULTÉ + TEMPS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <label className="block">
              <span className="font-medium text-gray-700 dark:text-gray-200">Catégorie</span>
              <select
                name="categorie"
                value={form.categorie}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-stone-700 text-gray-900 dark:text-white p-3 rounded-md transition-colors duration-300"
              >
                <option value="plats">Plats</option>
                <option value="desserts">Desserts</option>
                <option value="boissons">Boissons</option>
              </select>
            </label>

            <label className="block">
              <span className="font-medium text-gray-700 dark:text-gray-200">Difficulté</span>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-stone-700 text-gray-900 dark:text-white p-3 rounded-md transition-colors duration-300"
              >
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </label>

            <label className="block">
              <span className="font-medium text-gray-700 dark:text-gray-200">Temps de préparation</span>
              <input
                name="preparationTime"
                type="text"
                value={form.preparationTime}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-stone-700 text-gray-900 dark:text-white p-3 rounded-md transition-colors duration-300"
              />
            </label>
          </div>

          {/* DESCRIPTION */}
          <label className="block mb-6">
            <span className="font-medium text-gray-700 dark:text-gray-200">Description</span>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-stone-700 text-gray-900 dark:text-white p-3 rounded-md h-28 transition-colors duration-300"
            />
          </label>

          {/* INGREDIENTS */}
          <div className="mb-6">
            <span className="font-medium text-gray-700 dark:text-gray-200">Ingrédients</span>

            <div className="flex items-center gap-3 mt-2">
              <input
                name="__ingredientsText"
                type="text"
                value={form.__ingredientsText}
                onChange={handleIngredientsInputChange}
                className="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-stone-700 text-gray-900 dark:text-white p-3 rounded-md transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => setShowIngredientsList(s => !s)}
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: "#CDA077" }}
              >
                +
              </button>
            </div>

            {form.ingredients.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.ingredients.map(i => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#F5EDE3] dark:bg-stone-700 text-gray-800 dark:text-gray-200 rounded-full flex items-center gap-2 border border-gray-200 dark:border-gray-600"
                  >
                    {i}
                    <button
                      type="button"
                      onClick={() => removeIngredient(i)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {showIngredientsList && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-md p-3 mt-3 bg-gray-50 dark:bg-stone-700 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-200">Suggestions</strong>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {suggestions.map(s => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => addIngredient(s)}
                        className="w-full px-3 py-1 bg-gray-200 dark:bg-stone-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-stone-500 transition-colors duration-200"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ETAPES */}
          <div className="mb-6">
            <span className="font-medium text-gray-700 dark:text-gray-200">Étapes</span>

            <div className="flex items-center gap-3 mt-2">
              <input
                name="__stepText"
                type="text"
                value={form.__stepText}
                onChange={e => setForm(prev => ({ ...prev, __stepText: e.target.value }))}
                className="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-stone-700 text-gray-900 dark:text-white p-3 rounded-md transition-colors duration-300"
              />

              <button
                type="button"
                onClick={() => setShowStepsList(s => !s)}
                className="px-4 py-2 rounded-md text-white"
                style={{ backgroundColor: "#CDA077" }}
              >
                +
              </button>
            </div>

            {form.preparation.length > 0 && (
              <ol className="list-decimal ml-6 mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                {form.preparation.map((st, idx) => (
                  <li key={idx}>
                    {st}
                    <button
                      type="button"
                      onClick={() => removeStep(idx)}
                      className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ol>
            )}

            {showStepsList && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-md p-3 mt-3 bg-gray-50 dark:bg-stone-700 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-200">Suggestions d'étapes</strong>
                <ul className="mt-2 grid grid-cols-1 gap-2">
                  {stepSuggestions.map(s => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => addStep(s)}
                        className="w-full px-3 py-1 bg-gray-200 dark:bg-stone-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-stone-500 transition-colors duration-200"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full mt-6 text-white py-3 rounded-md font-medium shadow hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: "#CDA077" }}
          >
            Sauvegarder
          </button>
        </form>
      </div>
    </div>
  );
}
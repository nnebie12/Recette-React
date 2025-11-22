import { useState } from 'react';

export default function EditRecette({ recette, onSave, onCancel }) {

  const [form, setForm] = useState({
    name: recette?.name || '',
    description: recette?.description || '',
    image: recette?.image || '',
    temps: recette?.temps || '',
    difficulte: recette?.difficulte || 'Facile',
    category: recette?.category || '',
    ingredients: recette?.ingredients || [],
    preparation: recette?.preparation || [],   
    __ingredientsText: '',
    __stepText: '',
  });

  
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleIngredientsInputChange(e) {
    setForm(prev => ({ ...prev, __ingredientsText: e.target.value }));
  }

  function addIngredient(ing) {
    if (!ing) return;
    setForm(prev => ({
      ...prev,
      ingredients: [...new Set([...prev.ingredients, ing])],
      __ingredientsText: '',
    }));
  }

  function removeIngredient(ing) {
    setForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ing),
    }));
  }

  function addStep(step) {
    if (!step) return;
    setForm(prev => ({
      ...prev,
      preparation: [...prev.preparation, step],
      __stepText: '',
    }));
  }

  function removeStep(index) {
    setForm(prev => ({
      ...prev,
      preparation: prev.preparation.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...recette, ...form });
  }

  return (
    <div className="bg-white p-6 rounded-md shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Modifier la Recette</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* TITRE */}
        <label className="block">
          <span className="font-medium text-gray-700">Titre</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 bg-gray-50 p-3 rounded-md"
          />
        </label>

        {/* DIFFICULTÉ + TEMPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="font-medium text-gray-700">Difficulté</span>
            <select
              name="difficulte"
              value={form.difficulte}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 bg-gray-50 p-3 rounded-md"
            >
              <option value="Facile">Facile</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Difficile">Difficile</option>
            </select>
          </label>

          <label className="block">
            <span className="font-medium text-gray-700">Temps de préparation</span>
            <input
              name="temps"
              type="text"
              value={form.temps}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 bg-gray-50 p-3 rounded-md"
            />
          </label>
        </div>

        {/* DESCRIPTION */}
        <label className="block">
          <span className="font-medium text-gray-700">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 bg-gray-50 p-3 rounded-md h-28"
          />
        </label>

        {/* INGREDIENTS */}
        <div>
          <span className="font-medium text-gray-700">Ingrédients</span>

          <div className="flex gap-3 mt-2">
            <input
              type="text"
              value={form.__ingredientsText}
              onChange={handleIngredientsInputChange}
              className="flex-1 border border-gray-300 bg-gray-50 p-3 rounded-md"
            />

            <button
              type="button"
              onClick={() => addIngredient(form.__ingredientsText)}
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: "#CDA077" }}
            >
              +
            </button>
          </div>

          {form.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.ingredients.map(ing => (
                <span key={ing} className="px-3 py-1 bg-[#F5EDE3] rounded-full border flex items-center gap-2">
                  {ing}
                  <button type="button" onClick={() => removeIngredient(ing)} className="text-red-500">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ETAPES */}
        <div>
          <span className="font-medium text-gray-700">Étapes</span>

          <div className="flex gap-3 mt-2">
            <input
              type="text"
              value={form.__stepText}
              onChange={e => setForm(prev => ({ ...prev, __stepText: e.target.value }))}
              className="flex-1 border border-gray-300 bg-gray-50 p-3 rounded-md"
            />
            <button
              type="button"
              onClick={() => addStep(form.__stepText)}
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: "#CDA077" }}
            >
              +
            </button>
          </div>

          {form.preparation.length > 0 && (
            <ol className="list-decimal ml-6 mt-3 space-y-1">
              {form.preparation.map((st, idx) => (
                <li key={idx}>
                  {st}
                  <button type="button" onClick={() => removeStep(idx)} className="ml-2 text-red-500">
                    ×
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* BOUTONS */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 rounded-md text-white shadow"
            style={{ backgroundColor: "#CDA077" }}
          >
            Enregistrer
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100"
          >
            Annuler
          </button>
        </div>

      </form>
    </div>
  );
}

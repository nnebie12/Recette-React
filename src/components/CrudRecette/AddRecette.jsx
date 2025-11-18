// ...existing code...
import { useRef, useState } from 'react';
import { useRecettes } from '../../hooks/useRecettes';

export default function AddRecette({ addRecette: addRecetteProp }) {
  const hook = useRecettes();
  const addRecette = addRecetteProp || hook.addRecette;

  // form.ingredients est un tableau en interne pour faciliter la sélection
  // form.image contiendra une DataURL (ou null)
  const [form, setForm] = useState({ name: '', ingredients: [], preparation: [], difficulty: 'facile', preparationTime: '', description: '', image: null, __ingredientsText: '', __stepText: '' });
  const [showIngredientsList, setShowIngredientsList] = useState(false);
  const [showStepsList, setShowStepsList] = useState(false);
  const suggestions = ['Tomate', 'Oignon', 'Ail', 'Sel', 'Poivre', 'Beurre', 'Olive', 'Basilic'];
  const stepSuggestions = ['Couper en dés', 'Émincer', 'Faire revenir', 'Mijoter 10 min', 'Assaisonner', 'Cuire 20 min'];
  const containerRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleIngredientsInputChange(e) {
    const value = e.target.value;
    setForm(prev => ({ ...prev, __ingredientsText: value }));
  }

  function addIngredient(ing) {
    setForm(prev => ({ ...prev, ingredients: Array.from(new Set([...prev.ingredients, ing])), __ingredientsText: '' }));
    setShowIngredientsList(false);
  }

  function removeIngredient(ing) {
    setForm(prev => ({ ...prev, ingredients: prev.ingredients.filter(i => i !== ing) }));
  }

  function addStep(step) {
    setForm(prev => ({ ...prev, preparation: [...prev.preparation, step], __stepText: '' }));
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
    setForm(prev => ({ ...prev, preparation: prev.preparation.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      console.warn('Nom requis');
      return;
    }

    const newRecette = {
      id: Date.now().toString(),
      title: form.name.trim(),
      ingredients: form.ingredients,
      preparation: form.preparation,
      difficulty: form.difficulty,
      preparationTime: form.preparationTime,
      description: form.description,
      image: form.image || null,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    if (typeof addRecette === 'function') {
      addRecette(newRecette);
    } else {
      console.warn('addRecette unavailable', addRecette);
    }

    setForm({ name: '', ingredients: [], preparation: [], difficulty: 'facile', preparationTime: '', description: '', image: null, __ingredientsText: '', __stepText: '' });
    setShowIngredientsList(false);
    setShowStepsList(false);

    if (containerRef.current) {
      const input = containerRef.current.querySelector('input[name="name"]');
      if (input) input.focus();
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={containerRef}>
      <label>
        Image de la recette
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {form.image && (
            <div style={{ marginTop: '8px' }}>
              <img src={form.image} alt="aperçu" style={{ maxWidth: '200px', display: 'block', marginBottom: '6px' }} />
              <button type="button" onClick={removeImage}>Supprimer l'image</button>
            </div>
          )}
        </div>
      </label>
      <br />
      <label>
        Nom
        <input name="name" type="text" value={form.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Difficulté
        <select name="difficulty" value={form.difficulty} onChange={handleChange}>
          <option value="facile">Facile</option>
          <option value="moyen">Moyen</option>
          <option value="difficile">Difficile</option>
        </select>
      </label>
      <br />
      <label>
        Temps de préparation
        <input name="preparationTime" type="text" value={form.preparationTime} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description
        <textarea name="description" value={form.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Ingrédients
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            name="__ingredientsText"
            type="text"
            placeholder={form.ingredients.length ? form.ingredients.join(', ') : 'Ajouter des ingrédients'}
            value={form.__ingredientsText || ''}
            onChange={handleIngredientsInputChange}
          />
          <button type="button" onClick={() => setShowIngredientsList(s => !s)}>+</button>
        </div>
      </label>
      {form.ingredients.length > 0 && (
        <div style={{ marginTop: '6px' }}>
          <strong>Ingrédients sélectionnés:</strong>
          <ul>
            {form.ingredients.map(i => (
              <li key={i}>
                {i} <button type="button" onClick={() => removeIngredient(i)}>x</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showIngredientsList && (
        <div style={{ border: '1px solid #ddd', padding: '8px', marginTop: '6px', maxWidth: '300px' }}>
          <strong>Suggestions</strong>
          <ul>
            {suggestions.map(s => (
              <li key={s}>
                <button type="button" onClick={() => addIngredient(s)}>{s}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <br />
      <label>
        Étapes de préparation
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            name="__stepText"
            type="text"
            placeholder={form.preparation.length ? `Étapes: ${form.preparation.length}` : 'Ajouter une étape'}
            value={form.__stepText || ''}
            onChange={e => setForm(prev => ({ ...prev, __stepText: e.target.value }))}
          />
          <button type="button" onClick={() => {
            const text = (form.__stepText || '').trim();
            if (text) addStep(text);
          }}>Ajouter</button>
          <button type="button" onClick={() => setShowStepsList(s => !s)}>+</button>
        </div>
      </label>

      {form.preparation.length > 0 && (
        <div style={{ marginTop: '6px' }}>
          <strong>Étapes:</strong>
          <ol>
            {form.preparation.map((st, idx) => (
              <li key={idx}>
                {st} <button type="button" onClick={() => removeStep(idx)}>x</button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {showStepsList && (
        <div style={{ border: '1px solid #ddd', padding: '8px', marginTop: '6px', maxWidth: '300px' }}>
          <strong>Suggestions d'étapes</strong>
          <ul>
            {stepSuggestions.map(s => (
              <li key={s}>
                <button type="button" onClick={() => addStep(s)}>{s}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <br />
      <button type="submit">Sauvegarder</button>
    </form>
  );
}
// ...existing code...
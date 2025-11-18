import { useState } from 'react';
import { useRecettes } from '../hooks/useRecettes';

export default function AddRecette({ addRecette: addRecetteProp }) {
  const hook = useRecettes();
  const addRecette = addRecetteProp || hook.addRecette;

  const [form, setForm] = useState({ name: '', ingredients: '', preparation: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newRecette = {
      id: Date.now(),
      title: form.name,
      ingredients: form.ingredients.split(',').map(s => s.trim()).filter(Boolean),
      preparation: form.preparation,
      isFavorite: false
    };
    addRecette(newRecette);
    setForm({ name: '', ingredients: '', preparation: '' });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom
        <input name="name" type="text" value={form.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Ingrédients (séparés par des virgules)
        <input name="ingredients" type="text" value={form.ingredients} onChange={handleChange} />
      </label>
      <br />
      <label>
        Préparation
        <textarea name="preparation" value={form.preparation} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Ajouter Recette</button>
    </form>
  );
}
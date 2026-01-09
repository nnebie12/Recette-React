import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecettes } from '../../hooks/useRecettes';

import ImageUploader from './ImageUploader';
import IngredientsInput from './IngredientsInput';
import StepsInput from './StepsInput';

export default function AddRecette({ addRecette: addRecetteProp }) {
  const { addRecette: hookAddRecette } = useRecettes();
  const addRecette = addRecetteProp || hookAddRecette;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    ingredients: [],
    preparation: [],
    difficulty: 'facile',
    preparationTime: '',
    description: '',
    categorie: 'plats',
    image: null,
  });

  const [toast, setToast] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    addRecette({
      id: Date.now(),
      ...formData,
      isFavorite: false,
    });

    setToast('Recette créée');
    setTimeout(() => navigate('/'), 1200);
  }

  return (
    <div className="min-h-screen py-10 px-4">
      {toast && <div className="fixed top-4 right-4">{toast}</div>}

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">

        <ImageUploader
          image={formData.image}
          onChange={image =>
            setFormData(p => ({ ...p, image }))
          }
        />

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom"
        />

        <IngredientsInput
          ingredients={formData.ingredients}
          onChange={ingredients =>
            setFormData(p => ({ ...p, ingredients }))
          }
        />

        <StepsInput
          steps={formData.preparation}
          onChange={preparation =>
            setFormData(p => ({ ...p, preparation }))
          }
        />

        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
}

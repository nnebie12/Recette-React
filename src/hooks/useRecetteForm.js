import { useState } from "react";

export function useRecetteForm(recette, onSave) {
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

    return { form,setForm, handleChange, handleIngredientsInputChange, addIngredient, removeIngredient, addStep, removeStep, handleSubmit  };

}
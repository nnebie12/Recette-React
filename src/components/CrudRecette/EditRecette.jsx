import { useRecetteForm } from '../../hooks/useRecetteForm';
import BaseField from './edit/BaseField';
import IngredientEdit from './edit/IngredientEdit';
import StepEdit from './edit/StepEdit';

export default function EditRecette({ recette, onSave, onCancel }) {

  const { form, setForm, handleChange, handleIngredientsInputChange, addIngredient, removeIngredient, addStep, removeStep, handleSubmit } = useRecetteForm(recette, onSave);


  return (
    <div className="bg-white p-6 rounded-md shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Modifier la Recette</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <BaseField form={form} handleChange={handleChange} />

        <IngredientEdit
          form={form}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          handleIngredientsInputChange={handleIngredientsInputChange}
        />

        <StepEdit
          form={form}
          setForm={setForm}
          addStep={addStep}
          removeStep={removeStep}
        />


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

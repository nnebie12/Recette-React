function IngredientEdit({ form, addIngredient, removeIngredient, handleIngredientsInputChange }) {
    return (
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
    )
}

export default IngredientEdit;
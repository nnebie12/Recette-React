import { useRef, useState } from "react";
import { useRecettes } from "../../hooks/useRecettes";
import { useNavigate } from "react-router";

export default function AddRecette({ addRecette: addRecetteProp }) {
  const hook = useRecettes();
  const addRecette = addRecetteProp || hook.addRecette;
  const navigate = useNavigate();

  // ---------------------------
  // 1) ÉTAT MÉTIER (formData)
  // ---------------------------
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [],
    preparation: [],
    difficulty: "facile",
    preparationTime: "",
    description: "",
    categorie: "plats",
    image: null,
  });

  // -------------------------------
  // 2) ÉTAT PURE UI (uiState)
  // -------------------------------
  const [uiState, setUiState] = useState({
    ingredientInput: "",
    stepInput: "",
    showIngredientList: false,
    showStepList: false,
    toast: "",
  });

  const containerRef = useRef(null);

  const suggestions = ["Tomate", "Oignon", "Ail", "Sel", "Poivre", "Beurre", "Olive", "Basilic"];
  const stepSuggestions = [
    "Couper en dés",
    "Émincer",
    "Faire revenir",
    "Mijoter 10 min",
    "Assaisonner",
    "Cuire 20 min",
  ];

  // ---------------------------
  // HANDLERS
  // ---------------------------
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleIngredientInputChange(e) {
    setUiState((prev) => ({ ...prev, ingredientInput: e.target.value }));
  }

  function handleStepInputChange(e) {
    setUiState((prev) => ({ ...prev, stepInput: e.target.value }));
  }

  function addIngredient(ing) {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...new Set([...prev.ingredients, ing])],
    }));
    setUiState((prev) => ({ ...prev, ingredientInput: "", showIngredientList: false }));
  }

  function removeIngredient(ing) {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i !== ing),
    }));
  }

  function addStep(step) {
    setFormData((prev) => ({
      ...prev,
      preparation: [...prev.preparation, step],
    }));
    setUiState((prev) => ({ ...prev, stepInput: "", showStepList: false }));
  }

  function removeStep(idx) {
    setFormData((prev) => ({
      ...prev,
      preparation: prev.preparation.filter((_, i) => i !== idx),
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setFormData((prev) => ({ ...prev, image: null }));
  }

  // ---------------------------
  // SUBMIT
  // ---------------------------
  function handleSubmit(e) {
    e.preventDefault();

    const newRecette = {
      id: Date.now(),
      ...formData,
      isFavorite: false,
    };

    addRecette(newRecette);

    setUiState((prev) => ({ ...prev, toast: "Recette créée" }));

    setTimeout(() => {
      setUiState((prev) => ({ ...prev, toast: "" }));
      navigate("/");
    }, 1200);

    // Reset complet
    setFormData({
      name: "",
      ingredients: [],
      preparation: [],
      difficulty: "facile",
      preparationTime: "",
      description: "",
      categorie: "plats",
      image: null,
    });

    setUiState({
      ingredientInput: "",
      stepInput: "",
      showIngredientList: false,
      showStepList: false,
      toast: "",
    });
  }

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-stone-900 py-10 px-4">
      {uiState.toast && (
        <div className="fixed right-6 top-6 bg-black dark:bg-stone-700 text-white px-4 py-2 rounded-md shadow-md z-50">
          {uiState.toast}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        ref={containerRef}
        className="p-8 bg-white dark:bg-stone-800 shadow-md rounded-md w-full max-w-3xl mx-auto border border-gray-200 dark:border-gray-700"
      >
        {/* IMAGE */}
        <label className="block mb-6">
          <div className="border-2 border-dashed rounded-md p-6 text-center">
            <input type="file" accept="image/*" id="imgUpload" className="hidden" onChange={handleImageChange} />
            <label
              htmlFor="imgUpload"
              className="cursor-pointer px-4 py-2 text-white rounded-md"
              style={{ backgroundColor: "#CDA077" }}
            >
              Upload Image
            </label>
          </div>

          {formData.image && (
            <div className="mt-4">
              <img src={formData.image} alt="preview" className="w-48 rounded-md shadow" />
              <button type="button" onClick={removeImage} className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md">
                Supprimer l’image
              </button>
            </div>
          )}
        </label>

        {/* NOM */}
        <label className="block mb-6">
          <span className="font-medium">Nom</span>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full border p-3 rounded-md"
          />
        </label>

        {/* CATÉGORIE + DIFFICULTÉ + TEMPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <label className="block">
            <span>Catégorie</span>
            <select name="categorie" value={formData.categorie} onChange={handleChange} className="mt-1 w-full p-3 border rounded-md">
              <option value="plats">Plats</option>
              <option value="desserts">Desserts</option>
              <option value="boissons">Boissons</option>
            </select>
          </label>

          <label className="block">
            <span>Difficulté</span>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="mt-1 w-full p-3 border rounded-md">
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
          </label>

          <label className="block">
            <span>Temps préparation</span>
            <input
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-md"
            />
          </label>
        </div>

        {/* DESCRIPTION */}
        <label className="block mb-6">
          <span>Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full h-28 p-3 border rounded-md"
          />
        </label>

        {/* INGREDIENTS */}
        <div className="mb-6">
          <span>Ingrédients</span>

          <div className="flex gap-3 mt-2">
            <input
              type="text"
              value={uiState.ingredientInput}
              onChange={handleIngredientInputChange}
              className="flex-1 border p-3 rounded-md"
            />
            <button
              type="button"
              onClick={() =>
                setUiState((p) => ({ ...p, showIngredientList: !p.showIngredientList }))
              }
              className="px-4 py-2 text-white rounded-md"
              style={{ backgroundColor: "#CDA077" }}
            >
              +
            </button>
          </div>

          {formData.ingredients.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {formData.ingredients.map((i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-gray-200 flex items-center gap-2">
                  {i}
                  <button onClick={() => removeIngredient(i)} className="text-red-500">×</button>
                </span>
              ))}
            </div>
          )}

          {uiState.showIngredientList && (
            <div className="mt-3 border p-3 rounded-md bg-gray-50">
              <strong>Suggestions</strong>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => addIngredient(s)}
                      className="w-full px-3 py-1 bg-gray-200 rounded-md"
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
          <span>Étapes</span>

          <div className="flex gap-3 mt-2">
            <input
              type="text"
              value={uiState.stepInput}
              onChange={handleStepInputChange}
              className="flex-1 border p-3 rounded-md"
            />
            <button
              type="button"
              onClick={() => setUiState((p) => ({ ...p, showStepList: !p.showStepList }))}
              className="px-4 py-2 text-white rounded-md"
              style={{ backgroundColor: "#CDA077" }}
            >
              +
            </button>
          </div>

          {formData.preparation.length > 0 && (
            <ol className="list-decimal ml-6 mt-3 space-y-1">
              {formData.preparation.map((step, idx) => (
                <li key={idx}>
                  {step}
                  <button onClick={() => removeStep(idx)} className="text-red-500 ml-2">×</button>
                </li>
              ))}
            </ol>
          )}

          {uiState.showStepList && (
            <div className="mt-3 border p-3 rounded-md bg-gray-50">
              <strong>Suggestions d'étapes</strong>
              <ul className="mt-2 space-y-2">
                {stepSuggestions.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => addStep(s)} className="w-full px-3 py-1 bg-gray-200 rounded-md">
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
          className="w-full mt-6 py-3 text-white rounded-md"
          style={{ backgroundColor: "#CDA077" }}
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";

export default function IngredientInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;

    onAdd(text.trim());
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="form-input"
        placeholder="Ajouter un ingrédient"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="button" className="btn-secondary" onClick={handleAdd}>
        Ajouter
      </button>
    </div>
  );
}

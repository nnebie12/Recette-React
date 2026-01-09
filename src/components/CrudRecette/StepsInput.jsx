import { useState } from 'react';

const STEP_SUGGESTIONS = [
  'Préchauffer le four',
  'Couper les ingrédients',
  'Faire revenir à feu moyen',
  'Laisser mijoter',
];

export default function StepsInput({ steps, onChange }) {
  const [text, setText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  function addStep(value) {
    if (!value.trim()) return;
    onChange([...steps, value.trim()]);
    setText('');
    setShowSuggestions(false);
  }

  function removeStep(index) {
    onChange(steps.filter((_, i) => i !== index));
  }

  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">Étapes</label>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Ajouter une étape"
        />
        <button type="button" onClick={() => addStep(text)}>
          Ajouter
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex justify-between">
            <span>{index + 1}. {step}</span>
            <button
              type="button"
              onClick={() => removeStep(index)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {showSuggestions && (
        <div className="mt-2 flex flex-wrap gap-2">
          {STEP_SUGGESTIONS.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => addStep(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

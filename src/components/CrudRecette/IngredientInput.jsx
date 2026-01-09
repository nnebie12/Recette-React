import { useState } from 'react';

const SUGGESTIONS = ['Tomate', 'Oignon', 'Ail', 'Sel'];

export default function IngredientsInput({ ingredients, onChange }) {
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  function addIngredient(value) {
    onChange([...new Set([...ingredients, value])]);
    setText('');
    setShow(false);
  }

  function removeIngredient(value) {
    onChange(ingredients.filter(i => i !== value));
  }

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="button" onClick={() => setShow(!show)}>+</button>

      {ingredients.map(i => (
        <span key={i} onClick={() => removeIngredient(i)}>× {i}</span>
      ))}

      {show && SUGGESTIONS.map(s => (
        <button key={s} onClick={() => addIngredient(s)}>{s}</button>
      ))}
    </div>
  );
}

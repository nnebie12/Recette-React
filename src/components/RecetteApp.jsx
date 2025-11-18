import { useState } from 'react';
import { useRecettes } from '../hooks/useRecettes';
import AddRecette from './AddRecette';
import EdditRecette from './EdditRecette';
import RemoveRecette from './RemoveRecette';

export default function RecetteApp() {
  const { recettes, addRecette, removeRecette, updateRecette, toggleFavorite } = useRecettes();
  const [editingId, setEditingId] = useState(null);

  function handleSaveEdit(updated) {
    updateRecette(updated);
    setEditingId(null);
  }

  return (
    <div className="recette-app container p-4">
      <h1>Mes recettes</h1>
      <section className="mb-6">
        <AddRecette addRecette={addRecette} />
      </section>

      <section>
        {recettes.length === 0 && <div>Aucune recette pour l'instant.</div>}
        <ul>
          {recettes.map(r => (
            <li key={r.id} className="recette-item mb-4 border p-3">
              {editingId === r.id ? (
                <EdditRecette recette={r} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} />
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3>{r.title}</h3>
                      <div className="text-sm text-gray-600">{(r.ingredients || []).join(', ')}</div>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => toggleFavorite(r.id)}>{r.isFavorite ? '★' : '☆'}</button>
                      <button onClick={() => setEditingId(r.id)}>Éditer</button>
                      <RemoveRecette id={r.id} onRemove={() => removeRecette(r.id)} />
                    </div>
                  </div>
                  <p className="mt-2">{r.preparation}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

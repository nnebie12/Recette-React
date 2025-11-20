import { useState } from 'react'
import menu1 from './assets/menu1.png';
import viteLogo from '/vite.svg'
import './App.css'
import { useRecettes } from './hooks/useRecettes';
import AddRecette from './components/CrudRecette/AddRecette';
import EdditRecette from './components/CrudRecette/EditRecette';
import RemoveRecette from './components/CrudRecette/RemoveRecette';

function App() {
  const [count, setCount] = useState(0)
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
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        {recettes.length === 0 && <div>Aucune recette pour l'instant.</div>}
        <ul>
          {recettes.map(r => (
            <li key={r.id} className="recette-item mb-4 border p-3">
              <div
                style={{
                  position: 'relative',
                  borderRadius: 8,
                  overflow: 'hidden',
                  minHeight: 100,
                  backgroundImage: `url(${menu1})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {editingId === r.id ? (
                  <EdditRecette recette={r} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} />
                ) : (
                  <div style={{ position: 'relative', zIndex: 1, padding: 12, color: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3>{r.title}</h3>
                        <div className="text-sm text-gray-600" style={{ fontSize: 12, color: '#eee' }}>{(r.ingredients || []).join(', ')}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => toggleFavorite(r.id)}>{r.isFavorite ? '★' : '☆'}</button>
                        <button onClick={() => setEditingId(r.id)}>Éditer</button>
                        <RemoveRecette id={r.id} onRemove={() => removeRecette(r.id)} />
                      </div>
                    </div>
                    <p className="mt-2" style={{ marginTop: 8 }}>{r.preparation}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App
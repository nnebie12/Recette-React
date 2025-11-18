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
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <AddRecette addRecette={addRecette} />
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {recettes.map(r => (
          <li key={r.id} style={{ marginBottom: 12 }}>
            <div
              className="recette-item"
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
              <div style={{ position: 'relative', zIndex: 1, padding: 12, color: '#fff' }}>
                <strong style={{ display: 'block', fontSize: 18 }}>{r.title || r.name}</strong>
                <div style={{ fontSize: 12, marginTop: 6 }}>{(r.ingredients || []).join(', ')}</div>
                <div style={{ marginTop: 8, fontSize: 12 }}>{r.preparationTime ? `Temps: ${r.preparationTime}` : ''}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

import { useState } from 'react'
import menu1 from './assets/menu1.png'
import './App.css'
import { useRecettes } from './hooks/useRecettes'
import AddRecette from './components/CrudRecette/AddRecette'
import EdditRecette from './components/CrudRecette/EditRecette'
import RemoveRecette from './components/CrudRecette/RemoveRecette'
import NavBar from './components/Layout/NavBar'

function App() {
  const { recettes, addRecette, removeRecette, updateRecette, toggleFavorite } = useRecettes()
  const [editingId, setEditingId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  function handleSaveEdit(updated) {
    updateRecette(updated)
    setEditingId(null)
  }

  const btnStyle = {
    fontSize: 13,
    padding: '6px 8px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer'
  }

  const iconBtnStyle = {
    ...btnStyle,
    padding: '6px 10px'
  }

  return (
    <>
      <NavBar />

      <div className="recette-app container p-4">
        <h1 style={{ marginTop: 0 }}>Mes recettes</h1>

        <section className="mb-6">
          <AddRecette addRecette={addRecette} />
        </section>

        <section>
          {recettes.length === 0 && <div>Aucune recette pour l'instant.</div>}

          <ul className="recette-grid">
            {recettes.map(r => (
              <li key={r.id} className="recette-item">
                {editingId === r.id ? (
                  <div className="recette-card-edit">
                    <EdditRecette recette={r} onSave={handleSaveEdit} onCancel={() => setEditingId(null)} />
                  </div>
                ) : (
                  <div className="recette-card">
                    <div
                      className="recette-card-image"
                      style={{ backgroundImage: `url(${r.image || menu1})` }}
                      aria-hidden="true"
                    />
                    <div className="recette-card-body">
                      <div className="recette-card-head">
                        <div>
                          <h3 className="recette-card-title">{r.title || 'Sans titre'}</h3>
                          <div className="recette-card-ingredients">{(r.ingredients || []).join(', ')}</div>
                        </div>

                        <div className="recette-card-actions">
                          <button
                            onClick={() => toggleFavorite(r.id)}
                            title="Favori"
                            style={{ ...iconBtnStyle, background: r.isFavorite ? '#FFD54F' : '#eee' }}
                          >
                            {r.isFavorite ? '★' : '☆'}
                          </button>

                          <button
                            onClick={() => setEditingId(r.id)}
                            title="Éditer"
                            style={{ ...btnStyle, background: '#1976D2', color: '#fff' }}
                          >
                            Éditer
                          </button>

                          <button
                            onClick={() => setSelectedId(selectedId === r.id ? null : r.id)}
                            title="Voir"
                            style={{ ...btnStyle, background: '#4CAF50', color: '#fff' }}
                          >
                            Voir
                          </button>

                          <RemoveRecette id={r.id} onRemove={() => removeRecette(r.id)} />
                        </div>
                      </div>

                      {selectedId === r.id && (
                        <div className="recette-card-detail">
                          <p><strong>Préparation:</strong> {(r.preparation || []).join(' / ')}</p>
                          <p><strong>Difficulty:</strong> {r.difficulty || '-'}</p>
                          <p><strong>Time:</strong> {r.preparationTime || '-'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default App
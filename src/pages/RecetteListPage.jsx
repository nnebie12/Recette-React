import React from 'react';
import { useRecettes } from '../hooks/useRecettes';
import RemoveRecette from '../components/CrudRecette/RemoveRecette';
import { useNavigate } from 'react-router-dom';

export default function RecetteListPage() {
  const { recettes, removeRecette, toggleFavorite } = useRecettes();
  const navigate = useNavigate();

  return (
    <div className="recette-app container p-4">
      <h1>Mes recettes</h1>
      <section>
        {recettes.length === 0 && <div>Aucune recette pour l'instant.</div>}
        <ul>
          {recettes.map(r => (
            <li key={r.id} className="recette-item mb-4 border p-3" onClick={() => navigate(`/recette/${r.id}`)} style={{ cursor: 'pointer' }}>
              <div className="flex justify-between items-start">
                <div>
                  <h3>{r.title}</h3>
                  <div className="text-sm text-gray-600">{(r.ingredients || []).join(', ')}</div>
                </div>
                <div className="space-x-2">
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(r.id); }}>{r.isFavorite ? '★' : '☆'}</button>
                  <RemoveRecette id={r.id} onRemove={(e) => { e && e.stopPropagation(); removeRecette(r.id); }} />
                </div>
              </div>
              <p className="mt-2">{Array.isArray(r.preparation) ? r.preparation.join(' / ') : r.preparation}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

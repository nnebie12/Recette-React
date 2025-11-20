import React from 'react';

export default function DetailRecette({ recette }) {
  if (!recette) return null;

  return (
    <div className="detail-recette border p-4 mt-4">
      {recette.image && (
        <img src={recette.image} alt={recette.title} style={{ maxWidth: '100%', height: 'auto', marginBottom: '8px' }} />
      )}
      <h2>{recette.title}</h2>
      {recette.description && <p>{recette.description}</p>}
      <p><strong>Difficulty:</strong> {recette.difficulty}</p>
      <p><strong>Temps:</strong> {recette.preparationTime}</p>
      <div>
        <strong>Ingrédients :</strong>
        <ul>
          {(recette.ingredients || []).map(i => <li key={i}>{i}</li>)}
        </ul>
      </div>
      <div>
        <strong>Étapes :</strong>
        <ol>
          {(recette.preparation || []).map((s, idx) => <li key={idx}>{s}</li>)}
        </ol>
      </div>
    </div>
  );
}

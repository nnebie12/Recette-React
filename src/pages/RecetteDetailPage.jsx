import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecettes } from '../hooks/useRecettes';
import DetailRecette from '../components/RecetteDetails/DetailRecette';
import BackButton from '../components/common/BackButton';

export default function RecetteDetailPage() {
  const { id } = useParams();
  const { recettes } = useRecettes();

  const recette = recettes.find(r => String(r.id) === String(id));

  if (!recette) return (
    <div style={{ padding: '2rem' }}>
      <p>Recette non trouvée.</p>
      <BackButton>Retour</BackButton>
    </div>
  );

  return (
    <div style={{ padding: '2rem' }}>
      <BackButton to="/">Retour</BackButton>
      <DetailRecette recette={recette} />
    </div>
  );
}

import { Edit, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRecettes } from '../../hooks/useRecettes';
import EditRecette from '../CrudRecette/EditRecette';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

export default function DetailRecette() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recettes, updateRecette, removeRecette } = useRecettes();
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Dériver la recette depuis la liste 
  const recette = useMemo(() => recettes.find(r => String(r.id) === String(id)) || null, [id, recettes]);

  // Gestion de la sauvegarde après édition
  function handleSave(updatedRecette) {
    const recetteFormatee = {
      ...recette,
      id: recette.id, // preserve original ID
      // Prefer explicit updated fields; fall back to existing recette values
      name: updatedRecette.name ?? recette.name ?? '',
      preparationTime: updatedRecette.preparationTime ?? recette.preparationTime ?? '',
      difficulty: updatedRecette.difficulty ?? recette.difficulty ?? '',
      // Ensure arrays remain arrays; if updated value isn't provided, keep existing or default to []
      ingredients: Array.isArray(updatedRecette.ingredients)
        ? updatedRecette.ingredients
        : recette.ingredients ?? [],
      preparation: Array.isArray(updatedRecette.preparation)
        ? updatedRecette.preparation
        : recette.preparation ?? [],
      description: updatedRecette.description ?? recette.description ?? '',
      image: updatedRecette.image ?? recette.image ?? null,
      __ingredientsText: updatedRecette.__ingredientsText ?? recette.__ingredientsText ?? '',
      __stepText: updatedRecette.__stepText ?? recette.__stepText ?? '',
    };
    
    updateRecette(recetteFormatee);
    setShowEditModal(false);
  }

  // Gestion de la suppression
  function handleDelete() {
    removeRecette(recette.id);
    navigate('/');
  }

  if (!recette) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 text-lg">Recette introuvable</p>
        </div>
      </div>
    );
  }

  // Ne pas permettre la modification/suppression des recettes initiales (ID <= 5)
  const isInitialRecette = Number(recette.id) <= 5;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Image Header */}
      <div className="relative w-full h-72 md:h-96">
        <img 
          src={recette.image || 'https://placehold.co/1200x400/e5e5e5/666666?text=Image+de+recette'} 
          alt={recette.name || recette.name || 'Recette'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/1200x400/e5e5e5/666666?text=Image+non+disponible';
          }}
        />
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Titre */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {recette.name || recette.name || 'Sans titre'}
        </h1>

        {/* Description */}
        {recette.description && (
          <p className="text-gray-700 leading-relaxed text-justify mb-8">
            {recette.description}
          </p>
        )}

        {/* Temps et Difficulté */}
        <div className="flex items-center gap-8 mb-8 flex-wrap">
          {recette.preparationTime && (
            <>
              <div>
                <span className="text-gray-600 font-medium">Temps:</span>
                <span className="ml-2 text-gray-900 font-bold">
                  {recette.preparationTime}
                </span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
            </>
          )}
          {recette.difficulty && (
            <div>
              <span className="text-gray-600 font-medium">Difficulté:</span>
              <span className="ml-2 text-gray-900 font-bold">
                {recette.difficulty}
              </span>
            </div>
          )}
        </div>

        {/* Ingrédients */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingrédients</h2>
          <div className="flex flex-wrap gap-3">
            {recette.ingredients && recette.ingredients.length > 0 ? (
              recette.ingredients.map((ing, idx) => (
                <span 
                  key={idx}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200 text-sm"
                >
                  {ing}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Aucun ingrédient</p>
            )}
          </div>
        </div>

        {/* Étapes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Étapes</h2>
          {recette.preparation && recette.preparation.length > 0 ? (
            <ol className="space-y-5">
              {recette.preparation.map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-xl font-bold text-gray-900 flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="text-gray-700 leading-relaxed pt-1">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 text-sm">Aucune étape de préparation</p>
          )}
        </div>

        {/* Boutons Modifier et Supprimer (seulement pour recettes utilisateur) */}
        {!isInitialRecette && (
          <div className="flex justify-end gap-3 mt-12 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-md hover:opacity-95 transition shadow-md font-medium"
              style={{ backgroundColor: '#10B981' }}
            >
              <Edit className="w-4 h-4" />
              Modifier
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-md hover:opacity-95 transition shadow-md font-medium"
              style={{ backgroundColor: '#EF4444' }}
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </div>
        )}
      </div>

      {/* Modal d'édition */}
      <Modal 
        isOpen={showEditModal} 
        title="Modifier la recette"
        onClose={() => setShowEditModal(false)}
      >
        <EditRecette
          recette={{
            ...recette,
            name: recette.name || recette.name,
            preparationTime: recette.preparationTime,
            difficulty: recette.difficulty,
          }}
          onSave={handleSave}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer la recette "${recette.name || recette.name}" ? Cette action est irréversible.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        confirmLabel="Supprimer définitivement"
        cancelLabel="Annuler"
        isDangerous={true}
      />
    </div>
  );
}
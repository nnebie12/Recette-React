import NavBar from '../Layout/NavBar';

export default function DetailRecette({ recette }) {

  if (!recette) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Aucune recette sélectionnée</p>
      </div>
    );
  }

  return (
    <>
    


      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {recette.title || 'Sans titre'}
        </h1>

        {recette.description && (
          <p className="text-gray-700 leading-relaxed text-justify mb-8">
            {recette.description}
          </p>
        )}

        <div className="flex items-center gap-8 mb-8">
          {recette.temps && (
            <>
              <div>
                <span className="text-gray-600 font-medium">Temps:</span>
                <span className="ml-2 text-gray-900 font-bold">{recette.temps}</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
            </>
          )}
          {recette.difficulte && (
            <div>
              <span className="text-gray-600 font-medium">Difficulter:</span>
              <span className="ml-2 text-gray-900 font-bold">{recette.difficulte}</span>
            </div>
          )}
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredient</h2>
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

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Etape</h2>
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
      </div>
  </>
  );
}
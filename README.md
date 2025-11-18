Guide d'utilisation des Hooks : useState

But : expliquer comment utiliser `useState` pour gérer :
- la liste des recettes
- l'état du formulaire d'ajout
- la gestion des favoris

1) Introduction

`useState` est un Hook React qui permet d'ajouter un état local dans un composant fonctionnel. Il renvoie un tableau avec deux éléments : la valeur actuelle et une fonction pour la mettre à jour :

const [state, setState] = useState(initialValue);

2) Exemple : gestion d'une liste de recettes

- forme de donnée recommandée pour une recette :
{
  id: string | number,
  title: string,
  ingredients: string[],
  preparation: string,
  isFavorite: boolean
}

Initialisation :

const [recettes, setRecettes] = useState([]);

Ajouter une recette :

function addRecette(newRecette) {
  setRecettes(prev => [...prev, newRecette]);
}

Supprimer une recette :

function removeRecette(id) {
  setRecettes(prev => prev.filter(r => r.id !== id));
}

Mettre à jour une recette :

function updateRecette(updated) {
  setRecettes(prev => prev.map(r => r.id === updated.id ? {...r, ...updated} : r));
}

3) Gestion du formulaire d'ajout

Pour le formulaire, on peut gérer chaque champ séparément ou utiliser un objet `form` :

const [form, setForm] = useState({ title: '', ingredients: [], preparation: '' });

function handleChange(e) {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
}

Submission :

function handleSubmit(e) {
  e.preventDefault();
  const newRecette = { ...form, id: Date.now(), isFavorite: false };
  addRecette(newRecette);
  setForm({ title: '', ingredients: [], preparation: '' });
}

4) Gestion des favoris

Basculer un favori :

function toggleFavorite(id) {
  setRecettes(prev => prev.map(r => r.id === id ? {...r, isFavorite: !r.isFavorite} : r));
}

5) Bonnes pratiques

- Préférez les composants fonctionnels + hooks plutôt que les classes pour un code plus concis.
- Pour des modifications complexes, utilisez la forme fonctionnelle de `setState` : `setX(prev => ...)`.
- Gardez l'état minimal : dérivez ce qui peut l'être (par ex. filtres).
- Utilisez `useEffect` pour synchroniser l'état avec le localStorage si nécessaire.

Note sur la persistance
----------------------

Ce projet utilise la clé localStorage `recettes_v1` pour sauvegarder la liste des recettes.
Au démarrage, le hook `useRecettes` tente d'abord de charger les données depuis `localStorage`.
S'il n'y a pas de données persistées, il tente de charger un fichier `public/recettes.json` comme
fallback (utile pour fournir un jeu d'exemples). Les modifications ultérieures sont automatiquement
enregistrées dans `localStorage`.

6) Exemple combiné minimal

// ...existing code...

export function useRecettes() {
  const [recettes, setRecettes] = useState(() => {
    const raw = localStorage.getItem('recettes');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem('recettes', JSON.stringify(recettes));
  }, [recettes]);

  function addRecette(recette) { setRecettes(prev => [...prev, recette]); }
  function removeRecette(id) { setRecettes(prev => prev.filter(r => r.id !== id)); }
  function toggleFavorite(id) { setRecettes(prev => prev.map(r => r.id === id ? {...r, isFavorite: !r.isFavorite} : r)); }

  return { recettes, addRecette, removeRecette, toggleFavorite };
}

7) Ressources

- Documentation officielle React `useState` et `useEffect`.
- Exemples et patterns: controlled inputs, lifting state up.

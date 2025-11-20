import React from 'react'
import './App.css'
import { useRecettes } from './hooks/useRecettes';
import AddRecette from './components/CrudRecette/AddRecette';
import EdditRecette from './components/CrudRecette/EditRecette';
import RemoveRecette from './components/CrudRecette/RemoveRecette';
import { Routes, Route, Link } from 'react-router-dom';
import RecetteDetailPage from './pages/RecetteDetailPage';
import RecetteListPage from './pages/RecetteListPage';

function App() {
  //const [count, setCount] = useState(0)
  const { addRecette } = useRecettes();

  return (
    <>
      <div className="recette-app container p-4">
        <h1>Mes recettes</h1>
        <nav style={{ marginBottom: '12px' }}>
          <Link to="/">Liste</Link> {' | '}
          <Link to="/ajouter">Ajouter une recette</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<RecetteListPage />} />
        <Route path="/ajouter" element={<div style={{ padding: '2rem' }}><AddRecette addRecette={addRecette} /></div>} />
        <Route path="/recette/:id" element={<RecetteDetailPage />} />
      </Routes>
    </>
  )
}

export default App

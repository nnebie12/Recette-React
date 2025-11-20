import React from 'react'
import './App.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="recette-app container p-4">
        <h1>Mes recettes</h1>
        <nav style={{ marginBottom: '12px' }}>
          <button type="button" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#0077cc', cursor: 'pointer', padding: 0 }}>Liste</button> {' | '}
          <Link to="/ajouter">Ajouter une recette</Link>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

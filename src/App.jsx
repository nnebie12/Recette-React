//import { useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import AddRecette from './components/CrudRecette/AddRecette';
import EdditRecette from './components/CrudRecette/EditRecette';
import RemoveRecette from './components/CrudRecette/RemoveRecette';
import NavBar from './components/Layout/NavBar';
import Layout from './components/Layout/wrapper';
import RecipeFilter from './components/filtreRecette';
//import { useRecettes } from './hooks/useRecettes';
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function App() {

  /*const { recettes, addRecette, removeRecette, updateRecette, toggleFavorite } = useRecettes();
  const [editingId, setEditingId] = useState(null);*/
  const navigate = useNavigate();

  /*function handleSaveEdit(updated) {
    updateRecette(updated);
    setEditingId(null);
  }*/

  return (
    <>
      <NavBar />

      <Layout>
        <Card />
      </Layout>

      <RecipeFilter />

      <div className="recette-app container p-4">
        <h1>Mes recettes</h1>

        <nav style={{ marginBottom: '12px' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0077cc',
              cursor: 'pointer',
              padding: 0
            }}
          >
            Liste
          </button>

          {' | '}

          <Link to="/ajouter">Ajouter une recette</Link>
        </nav>
      </div>

      <Outlet />
    </>
  );
}

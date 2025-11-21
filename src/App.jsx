import RecettesPage from './pages/RecettesPage.jsx';
//import { useContext } from 'react';
import { AppContext } from './context/appContext.jsx';
import './App.css';
import Card from './components/Card/Card';
import AddRecette from './components/CrudRecette/AddRecette';
import EdditRecette from './components/CrudRecette/EditRecette';
import RemoveRecette from './components/CrudRecette/RemoveRecette';
import NavBar from './components/Layout/NavBar';
import Layout from './components/Layout/wrapper';
import RecipeFilter from './components/filtreRecette';
import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  //const { isDark } = useContext(AppContext);

  
  
  return (
      <div className="min-h-screen bg-gray-50 dark:bg-stone-900 transition-colors duration-500">
        <RecettesPage />
      </div>
    
  );
}

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
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <NavBar />

      <Layout>
        <Card />
      </Layout>

      <RecipeFilter />
    </>
  );
}

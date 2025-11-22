import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider } from './context/useAppContext'
//import RecetteListPage from './pages/RecetteListPage'
import RecetteDetailPage from '../src/pages/RecetteDetailPage.jsx'
import AddRecette from '../src/components/CrudRecette/AddRecette.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,      
  },
  {
    path: '/ajouter',
    element: <AddRecette />  
  },
  {
    path: '/recette/:id',
    element: <RecetteDetailPage /> 
  }
], { future: { v7_relativeSplatPath: true, v7_startTransition: true } });

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);

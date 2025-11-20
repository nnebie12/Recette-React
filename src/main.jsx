import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RecetteListPage from './pages/RecetteListPage'
import RecetteDetailPage from './pages/RecetteDetailPage'

// Define router with future flag to opt-in to v7 behavior for relative splat
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RecetteListPage /> },
      { path: 'recette/:id', element: <RecetteDetailPage /> },
    ]
  }
], { future: { v7_relativeSplatPath: true, v7_startTransition: true } });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

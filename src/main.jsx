import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RecetteApp from '../src/components/RecetteApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecetteApp />
  </StrictMode>,
)

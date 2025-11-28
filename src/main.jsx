import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importar Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Importar Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// Importar estilos personalizados (después de Bootstrap para poder sobrescribir)
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

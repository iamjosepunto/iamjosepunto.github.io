import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./i18n";

// Fija el atributo lang del <html> según el idioma guardado (SEO + accesibilidad)
document.documentElement.lang =
  localStorage.getItem("language") === "en" ? "en" : "es";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

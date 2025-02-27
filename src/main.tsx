import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { GameRegistry } from "../data_generation/GameRegistry.ts"

const data = GameRegistry.serialize('exo');
console.log(data);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

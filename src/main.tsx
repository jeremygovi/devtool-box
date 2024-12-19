import { StrictMode, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Activer la future fonctionnalité de React Router pour les transitions (si nécessaire)
if (process.env.NODE_ENV === 'development') {
  startTransition(() => {
    console.log('Start transition test');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

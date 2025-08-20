import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import outputs from '../amplify_outputs.json';
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router';

Amplify.configure(outputs);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

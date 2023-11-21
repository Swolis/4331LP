// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IdleProvider } from './services/IdleContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IdleProvider>
      <App />
    </IdleProvider>
  </React.StrictMode>
);

reportWebVitals();
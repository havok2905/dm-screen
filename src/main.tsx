/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import './designSystem/styles/reset.css';
import './designSystem/styles/variables.css';
import './designSystem/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

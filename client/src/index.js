import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Fixed closing parenthesis

root.render(
  <React.StrictMode> {/* Optional but recommended */}
    <App />
  </React.StrictMode>
);

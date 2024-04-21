import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

const header = ReactDOM.createRoot(document.getElementById('header'));
header.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();

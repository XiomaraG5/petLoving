import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './containers/Landing';
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Landing/>
  </React.StrictMode>
);

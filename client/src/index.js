import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useDispatch, Provider } from 'react-redux';
import keycloak from './Services/KeyCloak';
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { store } from './app/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <Provider  store={store}>
      <App />
    </Provider >
  </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
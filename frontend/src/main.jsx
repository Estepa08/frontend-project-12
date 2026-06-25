// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import App from './App.jsx';
import 'antd/dist/reset.css'; // ← СТИЛИ ANT DESIGN!
import './index.css'; // ← ВАШИ ГЛОБАЛЬНЫЕ СТИЛИ

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import ChatPage from './components/pages/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

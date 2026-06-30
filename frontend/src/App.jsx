import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './components/pages/HomePage/HomePage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import ChatPage from './components/pages/ChatPage/ChatPage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import { useSocketSubscriptions } from './hooks/useSocketSubscriptions';

function App() {
  useSocketSubscriptions();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

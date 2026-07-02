import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import AppHeader from './components/common/AppHeader';
import HomePage from './components/pages/HomePage/HomePage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import SignupPage from './components/pages/SignupPage/SignupPage';
import ChatPage from './components/pages/ChatPage/ChatPage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import { useSocketSubscriptions } from './hooks/useSocketSubscriptions';

// Отдельный компонент — чтобы useLocation работал внутри BrowserRouter
const AppLayout = () => {
  useSocketSubscriptions();
  const location = useLocation();
  const isChatPage = location.pathname === '/chat';

  return (
    <>
      {!isChatPage && <AppHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary, useRollbar } from '@rollbar/react';
import ProtectedRoute from './components/common/ProtectedRoute';
import AppHeader from './components/common/AppHeader';
import HomePage from './components/pages/HomePage/HomePage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import SignupPage from './components/pages/SignupPage/SignupPage';
import ChatPage from './components/pages/ChatPage/ChatPage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSocketSubscriptions } from './hooks/useSocketSubscriptions';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

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
      <ToastContainer />
    </>
  );
};

function App() {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary
        fallbackUI={() => (
          <div style={{ padding: '20px', color: 'red' }}>
            <h2>Что-то пошло не так.</h2>
            <p>Мы уже разбираемся с проблемой.</p>
          </div>
        )}
      >
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default App;

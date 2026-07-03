// frontend/src/components/pages/HomePage/HomePage.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
  if (isAuthenticated) {
    navigate('/chat');
  } else {
    navigate('/login');
  }
}, [isAuthenticated, navigate]);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body p-5 text-center">
              <h1 className="mb-4">{t('appName')}</h1>
              <p className="lead mb-4">Общайтесь с друзьями в реальном времени</p>
              <div className="d-grid gap-2">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Войти в аккаунт
                </Link>
                <Link to="/signup" className="btn btn-outline-primary btn-lg">
                  Регистрация
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
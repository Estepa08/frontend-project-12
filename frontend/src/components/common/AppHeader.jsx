// frontend/src/components/common/AppHeader.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const AppHeader = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {t('appName')}
        </Link>
        {isAuthenticated && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            {t('logout')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default AppHeader;
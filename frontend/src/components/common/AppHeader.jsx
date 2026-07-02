// frontend/src/components/common/AppHeader.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        {t('appName')}
      </Link>
      {isAuthenticated && <Button onClick={handleLogout}>{t('logout')}</Button>}
    </header>
  );
};

export default AppHeader;

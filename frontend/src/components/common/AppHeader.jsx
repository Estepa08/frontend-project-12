// frontend/src/components/common/AppHeader.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Hexlet Chat
      </Link>
      {isAuthenticated && <Button onClick={handleLogout}>Выйти</Button>}
    </header>
  );
};

export default AppHeader;

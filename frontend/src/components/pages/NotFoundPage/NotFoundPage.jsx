// frontend/src/components/pages/NotFoundPage/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
   const { t } = useTranslation();
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1">404</h1>
      <p className="lead">{t('errors.notFound')}</p>
      <Link to="/" className="btn btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
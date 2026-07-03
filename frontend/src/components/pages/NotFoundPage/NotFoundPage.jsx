// frontend/src/components/pages/NotFoundPage/NotFoundPage.jsx
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1">404</h1>
      <p className="lead">Извините, страница не найдена.</p>
      <Link to="/" className="btn btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
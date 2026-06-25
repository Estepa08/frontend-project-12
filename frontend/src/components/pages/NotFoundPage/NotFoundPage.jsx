// frontend/src/components/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница не найдена."
      extra={
        <Link to="/">
          <Button type="primary">Вернуться на главную</Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;

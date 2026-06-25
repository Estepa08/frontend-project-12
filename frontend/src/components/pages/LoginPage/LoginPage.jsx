// frontend/src/components/pages/LoginPage.jsx
import { Link } from 'react-router-dom';
import { Form, Input, Card, Typography, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './LoginPage.module.css'; // ← импорт стилей

const { Title } = Typography;

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Title level={2} className={styles.loginTitle}>
          Вход в чат
        </Title>
        <Form layout="vertical">
          <Form.Item name="username">
            <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.loginLink}>
          <Link to="/register">Нет аккаунта? Зарегистрируйтесь</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;

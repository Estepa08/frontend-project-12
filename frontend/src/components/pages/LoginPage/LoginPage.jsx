// frontend/src/components/pages/LoginPage/LoginPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Typography, Alert } from 'antd';
import { useAuth } from '../../../hooks/useAuth';
import styles from './LoginPage.module.css';

const { Title } = Typography;

// Схема валидации
const validationSchema = Yup.object({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const LoginPage = () => {
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  // ✅ Перенаправление после логина
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('🔵 Отправка формы:', values);
    try {
      await login(values);
      console.log('🟢 Логин успешен!');
    } catch (err) {
      console.error('🔴 Ошибка логина:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Вход в чат
        </Title>

        {error && (
          <Alert
            message="Ошибка"
            description={typeof error === 'string' ? error : error.message}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className={styles.fieldGroup}>
                <label>Имя пользователя</label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Введите имя"
                  className={`${styles.fieldInput} ${
                    errors.username && touched.username ? styles.error : ''
                  }`}
                />
                {errors.username && touched.username && (
                  <div className={styles.errorMessage}>{errors.username}</div>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label>Пароль</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                  className={`${styles.fieldInput} ${
                    errors.password && touched.password ? styles.error : ''
                  }`}
                />
                {errors.password && touched.password && (
                  <div className={styles.errorMessage}>{errors.password}</div>
                )}
              </div>

              <Button type="primary" htmlType="submit" block loading={isSubmitting || loading}>
                Войти
              </Button>

              <div className={styles.linkWrapper}>
                <Link to="/register">Нет аккаунта? Зарегистрируйтесь</Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default LoginPage;

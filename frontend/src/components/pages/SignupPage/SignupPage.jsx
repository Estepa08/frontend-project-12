// frontend/src/components/pages/SignupPage/SignupPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Typography, Alert } from 'antd';
import { useAuth } from '../../../hooks/useAuth';
import styles from './SignupPage.module.css';

const { Title } = Typography;

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

const SignupPage = () => {
  const { signup, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signup({
        username: values.username,
        password: values.password,
      });
    } catch {
      // ошибка уже в Redux через useAuth
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Регистрация
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
          initialValues={{ username: '', password: '', confirmPassword: '' }}
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
                  placeholder="От 3 до 20 символов"
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
                  placeholder="Не менее 6 символов"
                  className={`${styles.fieldInput} ${
                    errors.password && touched.password ? styles.error : ''
                  }`}
                />
                {errors.password && touched.password && (
                  <div className={styles.errorMessage}>{errors.password}</div>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label>Подтверждение пароля</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  className={`${styles.fieldInput} ${
                    errors.confirmPassword && touched.confirmPassword ? styles.error : ''
                  }`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className={styles.errorMessage}>{errors.confirmPassword}</div>
                )}
              </div>

              <Button type="primary" htmlType="submit" block loading={isSubmitting || loading}>
                Зарегистрироваться
              </Button>

              <div className={styles.linkWrapper}>
                <Link to="/login">Уже есть аккаунт? Войти</Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignupPage;

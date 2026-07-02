// frontend/src/components/pages/LoginPage/LoginPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Typography, Alert } from 'antd';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import styles from './LoginPage.module.css';

const { Title } = Typography;

const LoginPage = () => {
  const { t } = useTranslation();
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  // Схема внутри компонента — чтобы t() был доступен
  const validationSchema = Yup.object({
    username: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          {t('login.title')}
        </Title>

        {error && (
          <Alert
            message={t('errors.login')}
            description={t(error)}
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
                <label>{t('login.username')}</label>
                <Field
                  name="username"
                  type="text"
                  placeholder={t('login.username')}
                  className={`${styles.fieldInput} ${
                    errors.username && touched.username ? styles.error : ''
                  }`}
                />
                {errors.username && touched.username && (
                  <div className={styles.errorMessage}>{errors.username}</div>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label>{t('login.password')}</label>
                <Field
                  name="password"
                  type="password"
                  placeholder={t('login.password')}
                  className={`${styles.fieldInput} ${
                    errors.password && touched.password ? styles.error : ''
                  }`}
                />
                {errors.password && touched.password && (
                  <div className={styles.errorMessage}>{errors.password}</div>
                )}
              </div>

              <Button type="primary" htmlType="submit" block loading={isSubmitting || loading}>
                {t('login.submit')}
              </Button>

              <div className={styles.linkWrapper}>
                <Link to="/signup">{t('login.noAccount')}</Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default LoginPage;

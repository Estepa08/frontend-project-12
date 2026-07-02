import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Typography, Alert } from 'antd';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import styles from './SignupPage.module.css';

const { Title } = Typography;

const SignupPage = () => {
  const { t } = useTranslation();
  const { signup, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('validation.usernameLength'))
      .max(20, t('validation.usernameLength'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(6, t('validation.passwordLength'))
      .required(t('validation.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.passwordsMatch'))
      .required(t('validation.required')),
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/chat');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signup({ username: values.username, password: values.password });
    } catch {
      // ошибка уже в Redux
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          {t('signup.title')}
        </Title>

        {error && (
          <Alert
            message={t('errors.unknown')}
            description={t(error)}
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
                <label>{t('signup.username')}</label>
                <Field
                  name="username"
                  type="text"
                  placeholder={t('validation.usernameLength')}
                  className={`${styles.fieldInput} ${errors.username && touched.username ? styles.error : ''}`}
                />
                {errors.username && touched.username && (
                  <div className={styles.errorMessage}>{errors.username}</div>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label>{t('signup.password')}</label>
                <Field
                  name="password"
                  type="password"
                  placeholder={t('validation.passwordLength')}
                  className={`${styles.fieldInput} ${errors.password && touched.password ? styles.error : ''}`}
                />
                {errors.password && touched.password && (
                  <div className={styles.errorMessage}>{errors.password}</div>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label>{t('signup.confirmPassword')}</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder={t('signup.confirmPassword')}
                  className={`${styles.fieldInput} ${errors.confirmPassword && touched.confirmPassword ? styles.error : ''}`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className={styles.errorMessage}>{errors.confirmPassword}</div>
                )}
              </div>

              <Button type="primary" htmlType="submit" block loading={isSubmitting || loading}>
                {t('signup.submit')}
              </Button>

              <div className={styles.linkWrapper}>
                <Link to="/login">{t('signup.alreadyHaveAccount')}</Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignupPage;

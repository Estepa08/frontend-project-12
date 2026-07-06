// frontend/src/components/pages/LoginPage/LoginPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { loginSchema } from '../../../validation/schemas.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) navigate('/chat');
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">{t('login.title')}</h1>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {t(error)}
                </div>
              )}

              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="form-floating mb-3">
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        placeholder={t('login.username')}
                        className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="username">{t('login.username')}</label>
                      {errors.username && touched.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                      )}
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder={t('login.password')}
                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="password">{t('login.password')}</label>
                      {errors.password && touched.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-100 btn btn-outline-primary"
                      disabled={isSubmitting || loading}
                    >
                      {t('login.submit')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.noAccount')} </span>
                <Link to="/signup">{t('signup.title')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

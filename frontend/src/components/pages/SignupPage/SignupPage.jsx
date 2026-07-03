// frontend/src/components/pages/SignupPage/SignupPage.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

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
    if (isAuthenticated) navigate('/');
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">{t('signup.title')}</h1>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {t(error)}
                </div>
              )}

              <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="form-floating mb-3">
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        placeholder={t('signup.username')}
                        className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="username">{t('signup.username')}</label>
                      {errors.username && touched.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                      )}
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder={t('signup.password')}
                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="password">{t('signup.password')}</label>
                      {errors.password && touched.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder={t('signup.confirmPassword')}
                        className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <label htmlFor="confirmPassword">{t('signup.confirmPassword')}</label>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-100 btn btn-outline-primary"
                      disabled={isSubmitting || loading}
                    >
                      {t('signup.submit')}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="card-footer p-4">
              <div className="text-center">
                <Link to="/login">{t('signup.alreadyHaveAccount')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
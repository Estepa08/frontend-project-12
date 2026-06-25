// frontend/src/components/pages/RegisterPage/RegisterPage.jsx
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Typography } from 'antd';
import styles from './RegisterPage.module.css'; // ← импорт стилей

const { Title } = Typography;

// Схема валидации
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Имя пользователя обязательно'),
  email: Yup.string().email('Некорректный email').required('Email обязателен'),
  password: Yup.string()
    .min(6, 'Пароль должен быть минимум 6 символов')
    .required('Пароль обязателен'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),
});

const RegisterPage = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Данные регистрации:', values);
    setTimeout(() => {
      setSubmitting(false);
      alert('Регистрация прошла успешно!');
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Регистрация
        </Title>

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {/* Имя пользователя */}
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
                <ErrorMessage name="username" component="div" className={styles.errorMessage} />
              </div>

              {/* Email */}
              <div className={styles.fieldGroup}>
                <label>Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Введите email"
                  className={`${styles.fieldInput} ${
                    errors.email && touched.email ? styles.error : ''
                  }`}
                />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />
              </div>

              {/* Пароль */}
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
                <ErrorMessage name="password" component="div" className={styles.errorMessage} />
              </div>

              {/* Подтверждение пароля */}
              <div className={styles.fieldGroup}>
                <label>Подтвердите пароль</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  className={`${styles.fieldInput} ${
                    errors.confirmPassword && touched.confirmPassword ? styles.error : ''
                  }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Зарегистрироваться
              </Button>

              <div className={styles.linkWrapper}>
                <Link to="/login">Уже есть аккаунт? Войдите</Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default RegisterPage;

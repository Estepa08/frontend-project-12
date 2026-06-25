// src/components/forms/LoginForm.jsx
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // { username: '...', password: '...' }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder="Имя" />
      <input {...register('password')} type="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;

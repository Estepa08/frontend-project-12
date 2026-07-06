// src/validation/schemas.js
import * as Yup from 'yup';
import i18next from 'i18next';

const t = i18next.t.bind(i18next);

const CHANNEL_NAME_MIN_LENGTH = 3;
const CHANNEL_NAME_MAX_LENGTH = 20;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 6;

// --- Логин: без ограничений на длину, только required ---
export const loginSchema = Yup.object({
  username: Yup.string().required(t('validation.required')),
  password: Yup.string().required(t('validation.required')),
});

// --- Регистрация ---
export const signupSchema = Yup.object({
  username: Yup.string()
    .min(USERNAME_MIN_LENGTH, t('validation.usernameLength'))
    .max(USERNAME_MAX_LENGTH, t('validation.usernameLength'))
    .required(t('validation.required')),
  password: Yup.string()
    .min(PASSWORD_MIN_LENGTH, t('validation.passwordLength'))
    .required(t('validation.required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], t('validation.passwordsMatch'))
    .required(t('validation.required')),
});

// --- Канал: создание и переименование используют одну и ту же фабрику ---
/**
 * @param {string[]} existingNames - список ЗАПРЕЩЁННЫХ имён каналов.
 * Ответственность за фильтрацию (например, исключение текущего имени
 * при переименовании) лежит на вызывающем компоненте, а не на схеме.
 */
export const createChannelSchema = (existingNames) =>
  Yup.object({
    name: Yup.string()
      .min(CHANNEL_NAME_MIN_LENGTH, t('validation.channelNameLength'))
      .max(CHANNEL_NAME_MAX_LENGTH, t('validation.channelNameLength'))
      .notOneOf(existingNames, t('validation.channelNameUnique'))
      .required(t('validation.required')),
  });

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Estepa08/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Estepa08/frontend-project-12/actions)

## Чат-приложение (Slack Clone)
Real-time мессенджер с полноценной авторизацией, управлением каналами и обменом сообщениями в реальном времени. Реализовал JWT-авторизацию, WebSocket-соединение через Socket.io, Optimistic UI для мгновенного отображения сообщений и защиту от race condition через tempId. Архитектура построена на кастомных хуках с разделением ответственности — бизнес-логика полностью отделена от UI. Добавил фильтрацию нецензурных слов, мониторинг ошибок через Rollbar и интернационализацию. Покрыт e2e-тестами (16/16 Playwright).
React, Redux Toolkit, WebSocket/Socket.io, JWT, Formik + Yup, i18next, react-toastify, leo-profanity, Rollbar, Bootstrap, Playwright, Vite


## 📦 Требования

- Node.js версии 18 или выше
- npm

## ⚙️ Установка и запуск

```bash
git clone https://github.com/your-username/frontend-project-12.git
cd frontend-project-12

make install
make build
make start
```

После установки зависимостей проект доступен по адресу:
**http://localhost:5001**

**Приложение доступно по ссылке:**  
👉 [frontend-project-12-dutx.onrender.com](https://frontend-project-12-dutx.onrender.com/)

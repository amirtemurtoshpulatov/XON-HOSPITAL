# Развёртывание XON HOSPITAL

Сайт требует Node.js-сервер и PostgreSQL. Обычный статический FTP-хостинг не подходит, потому что админка, авторизация и заявки работают на сервере.

## Рекомендуемая схема

- приложение: Railway, Render, DigitalOcean App Platform, VPS с Docker или аналогичный Node.js-хостинг;
- база: управляемый PostgreSQL с ежедневными резервными копиями;
- медиа: постоянный диск/volume или S3-совместимое хранилище;
- домен: `xonhospital.uz`;
- HTTPS: бесплатный Let's Encrypt у хостинга или через Cloudflare.

## Обязательные переменные

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB
PAYLOAD_SECRET=ДЛИННАЯ_СЛУЧАЙНАЯ_СТРОКА
NEXT_PUBLIC_SERVER_URL=https://xonhospital.uz
CRON_SECRET=ДРУГАЯ_СЛУЧАЙНАЯ_СТРОКА
PREVIEW_SECRET=ЕЩЁ_ОДНА_СЛУЧАЙНАЯ_СТРОКА
GOOGLE_SHEETS_WEBHOOK_URL=
```

Не загружайте файл `.env` в GitHub.

## Docker

Для локальной проверки production-схемы:

```bash
docker compose up --build
```

Контейнер поднимает приложение и PostgreSQL. Пароль в `docker-compose.yml` предназначен только для локального запуска; в production задайте отдельные секреты у хостинга.

## Без Docker

```bash
corepack enable
pnpm install
pnpm build
pnpm start
```

## Первый администратор

После первого запуска откройте `/admin` и создайте владельца CMS. Используйте уникальный пароль и менеджер паролей. После этого создание новых администраторов доступно только авторизованным пользователям.

## Обновление и откат

1. Сделать backup PostgreSQL и каталога медиа.
2. Развернуть новую версию в staging.
3. Проверить `/`, `/ru`, `/admin` и тестовую заявку.
4. Переключить production на новую версию.
5. Для отката вернуть предыдущий Docker image/commit и восстановить backup только при несовместимой миграции.

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

## Демо-версия на Render

В корне репозитория есть `render.yaml`. Он автоматически создаёт Node.js web service, PostgreSQL, секреты и заполняет базу стартовыми врачами и услугами.

1. Нажмите **Deploy to Render** в `README.md`.
2. Войдите через GitHub и разрешите доступ к репозиторию.
3. Создайте Blueprint и дождитесь зелёного статуса.
4. Откройте `/admin` и создайте первого владельца CMS.

Бесплатный Render подходит только для демо: web service засыпает без трафика, бесплатная PostgreSQL истекает через 30 дней, а загруженные из CMS файлы не переживут перезапуск. Для боевого сайта используйте платную PostgreSQL с backup и S3-хранилище.

## Docker

Для локальной проверки production-схемы:

```bash
docker compose up --build
```

Контейнер поднимает приложение и PostgreSQL. Пароль в `docker-compose.yml` предназначен только для локального запуска; в production задайте отдельные секреты у хостинга.

## VPS / Fornex

Боевой сервер использует `compose.production.yml`: приложение, PostgreSQL и Caddy с автоматическим HTTPS.

1. Скопируйте `.env.production.example` в `.env.production` и замените все секреты.
2. Пока DNS не подключён, задайте `SITE_ADDRESS=http://SERVER_IP` и тот же адрес в `NEXT_PUBLIC_SERVER_URL`.
3. После подключения DNS установите `SITE_ADDRESS=xon-hospital.uz`, `WWW_SITE_ADDRESS=www.xon-hospital.uz` и `https://xon-hospital.uz` в `CANONICAL_ORIGIN`, `NEXT_PUBLIC_SERVER_URL` и `SITE_CANONICAL_URL`.
4. Запустите:

```bash
docker compose --env-file .env.production -f compose.production.yml up -d --build
```

Проверка состояния и журналов:

```bash
docker compose --env-file .env.production -f compose.production.yml ps
docker compose --env-file .env.production -f compose.production.yml logs --tail=200 web
```

Каталоги PostgreSQL, медиа и сертификаты Caddy хранятся в именованных Docker volumes и не удаляются при обновлении контейнеров.

Сервис `migrate` применяет миграции Payload перед запуском приложения. Чтобы заполнить новую базу стартовыми материалами, выполните:

```bash
docker compose --env-file .env.production -f compose.production.yml run --rm --no-deps -e SEED_MODE=if-empty migrate pnpm seed:clinic
```

## Без Docker

```bash
corepack enable
pnpm install
pnpm build
pnpm start
```

## Первый администратор

Для VPS укажите публичный IP владельца CMS в `ADMIN_SETUP_IP` и пересоздайте контейнер Caddy. Владелец с этого IP может открыть `/admin` и создать первый аккаунт с уникальным паролем. После регистрации удалите `ADMIN_SETUP_IP` и снова пересоздайте Caddy. Создание следующих администраторов доступно авторизованным пользователям.

## Обновление и откат

1. Сделать backup PostgreSQL и каталога медиа.
2. Развернуть новую версию в staging.
3. Проверить `/`, `/ru`, `/admin` и тестовую заявку.
4. Переключить production на новую версию.
5. Для отката вернуть предыдущий Docker image/commit и восстановить backup только при несовместимой миграции.
